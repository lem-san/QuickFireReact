import React, { useState, useEffect, useRef, useCallback } from 'react';
import './GameScreen.css';
import { handleControls } from './ControlMenu';
import correct from './assets/correct.png';
import incorrect from './assets/incorrect.png';
import confetti from 'https://cdn.skypack.dev/canvas-confetti';
import { playCorrectPing, playIncorrectPing, playCountdownTheme, stopSounds } from './Sounds';
import clock from './assets/countdownClock.png';

const GameScreen = ({ onSelectOption, checkedVocab, onGameFinish, timeLimit, questionType}) => {
    const [vocab, setVocab] = useState(null);
    const [scoreCounter, setScoreCounter] = useState(0);
    const [timerDuration, setTimerDuration] = useState(timeLimit);
    const scoreCounterRef = useRef(0);
    const [reviewVocab, setReviewVocab] = useState([]);
    const [renderedVocab, setRenderedVocab] = useState(null);

    useEffect(() => {
        const importData = async () => {
            const vocabPromises = [];
            const imagePromises = [];
    
            for (const category of checkedVocab) {
                vocabPromises.push(fetchVocabFromServer(category));
                imagePromises.push(fetchImagesFromServer(category));
            }
    
            const vocabularies = await Promise.all(vocabPromises);
            const imagePaths = await Promise.all(imagePromises);
    
            const flattenedVocab = vocabularies.flat();
            const flattenedImagePaths = imagePaths.flat();
    
            const vocabWithImagePaths = flattenedVocab.map(vocab => ({
                ...vocab,
                image: flattenedImagePaths.find(path => path.includes(vocab.id))
            }));
    
            setVocab(vocabWithImagePaths);
            renderRandomVocab(vocabWithImagePaths); // Pass true to indicate initial rendering
        };
    
        importData();
    }, [checkedVocab]);

    const fetchVocabFromServer = async (category) => {
        try {
            const response = await fetch(`/vocabData/${category}.json`);
            if (!response.ok) {
                throw new Error('Failed to fetch vocabulary data');
            }
            const vocabData = await response.json();
            return vocabData;
        } catch (error) {
            console.error('Error fetching vocabulary data:', error);
            return [];
        }
    };

    const fetchImagesFromServer = async (category) => {
        try {
            const response = await fetch(`https://storage.googleapis.com/storage/v1/b/illustrations_bucket/o?prefix=${category}/`);
            if (!response.ok) {
                throw new Error('Failed to fetch images');
            }
            const data = await response.json();
            if (data.items) {
                const paths = data.items.filter(item => item.name.endsWith(".png")).map(item => item.mediaLink);
                return paths;
            } else {
                throw new Error(`No images found in the ${category} folder`);
            }
        } catch (error) {
            console.error('Error fetching images:', error);
            return [];
        }
    };

    const renderRandomVocab = (vocabData) => {
        if (vocabData && vocabData.length > 0) {
            const randomIndex = Math.floor(Math.random() * vocabData.length);
            const randomVocab = vocabData[randomIndex];
            const randomValue = Math.random();
    
            // TODO:
            // Rename questionType to 'Modifiers'
            const shouldRenderImage = questionType.includes('Image');
            const shouldRenderEnglish = questionType.includes('English');
            const shouldRenderJapanese = questionType.includes('Japanese');
            const shouldRepeat = questionType.includes('Repeat');
    
            const renderImage = () => <img src={randomVocab.image} alt={randomVocab.english} />;
            const renderEnglish = () => <h1 className="vocabText">{randomVocab.english}</h1>;
            const renderJapanese = () => <h1 className="vocabText">{randomVocab.japanese}</h1>;
    
            const renderRandomItem = () => {
                if (shouldRenderImage && shouldRenderEnglish && shouldRenderJapanese) {
                    return randomValue < 0.7 ? renderImage() : randomValue < 0.85 ? renderEnglish() : renderJapanese();
                } else if (shouldRenderImage && (shouldRenderEnglish || shouldRenderJapanese)) {
                    return randomValue < 0.7 ? renderImage() : shouldRenderEnglish ? renderEnglish() : renderJapanese();
                } else if (shouldRenderEnglish && shouldRenderJapanese) {
                    return randomValue < 0.5 ? renderEnglish() : renderJapanese();
                } else if (shouldRenderEnglish) {
                    return renderEnglish();
                } else if (shouldRenderJapanese) {
                    return renderJapanese();
                } else if (shouldRenderImage) {
                    return renderImage();
                } else {
                    return null;
                }
            };
    
            const renderedItem = renderRandomItem();
            setRenderedVocab({...randomVocab, renderedItem});

            if (shouldRepeat) {
                const newVocabArray = [
                    ...vocab.slice(0, randomIndex), // Elements before the one to delete
                    ...vocab.slice(randomIndex + 1) // Elements after the one to delete
                  ];
                setVocab(newVocabArray)
            }

        } else {
            handleTimerFinish()
        }
    };

    const handleClick = (buttonId) => {
        switch (buttonId) {
            case "btnCorrect":
                renderRandomVocab(vocab);
                setScoreCounter(scoreCounter => scoreCounter + 1);
                playCorrectPing();
                confetti({
                    particleCount: 50,
                    startVelocity: 30,
                    spread: 360,
                    origin: {
                        x: Math.random(), y: Math.random() - 0.2
                    }
                });
                break;
            case "btnIncorrect":
                addToReview();
                break;
            default:
                break;
        }
    };
    
    const addToReview = () => {
        setReviewVocab(prevReviewVocab => {
            const newReviewVocab = [...prevReviewVocab, renderedVocab];
            renderRandomVocab(vocab);
            playIncorrectPing();
            return newReviewVocab;
        });
    };
    
    const handleKeyDown = useCallback(
        (event) => {
          if (event.key === 'ArrowLeft') {
            handleClick('btnCorrect' || 'btnPrevious');
          } else if (event.key === 'ArrowRight') {
            handleClick('btnIncorrect' || 'btnNext');
          }
        },
        [handleClick]
      );
    
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, [handleKeyDown]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimerDuration(prevTimerDuration => {
                if (prevTimerDuration === 0) {
                    handleTimerFinish();
                    clearInterval(timer);
                    return 0;
                } else if (prevTimerDuration === 32) {
                    playCountdownTheme();
                }
                return prevTimerDuration - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLimit]);

    useEffect(() => {
        scoreCounterRef.current = scoreCounter;
    }, [scoreCounter]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60).toString().padStart(1, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    const handleTimerFinish = () => {
        setReviewVocab(prevReviewVocab => {
            const newReviewVocab = [...prevReviewVocab];
            onGameFinish(scoreCounterRef.current, newReviewVocab);
            stopSounds();
            onSelectOption('ScoreScreen', checkedVocab, scoreCounterRef.current, timeLimit, questionType, newReviewVocab);
            return newReviewVocab;
        });
    };
    
    return (
        <>
            <div id="countdown">
                <img src={clock} alt="Clock" />
                <h1>{formatTime(timerDuration)}</h1>
            </div>
            <div className="game">
                {vocab && (
                    <div id="quizItem">
                        {renderedVocab?.renderedItem}
                    </div>
                )}
                <div id="answerBtns">
                    <button id="btnCorrect" onClick={() => handleClick('btnCorrect')}>
                        <img className="icon" src={correct} alt="Correct" />
                    </button>
                    <button id="btnIncorrect" onClick={() => handleClick('btnIncorrect')}>
                        <img className="icon" src={incorrect} alt="Incorrect" />
                    </button>
                </div>
            </div>
            <div className="controls">
                {handleControls("btnMainMenu", onSelectOption)}
            </div>
        </>
    );
};

export default GameScreen;