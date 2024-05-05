import React, { useState, useEffect, useRef } from 'react';
import './GameScreen.css'
import { handleControls } from './ControlMenu';
import correct from './assets/correct.png';
import incorrect from './assets/incorrect.png'
import confetti from 'https://cdn.skypack.dev/canvas-confetti';
import {playCorrectPing, playIncorrectPing, playCountdownTheme} from './Sounds'
import clock from './assets/countdownClock.png'

const GameScreen = ({ onSelectOption, checkedVocab, onGameFinish, timeLimit }) => {
    const [imagePaths, setImagePaths] = useState(null);
    const [randomImagePath, setRandomImagePath] = useState(null);
    const [scoreCounter, setScoreCounter] = useState(0); 
    const [timerDuration, setTimerDuration] = useState(timeLimit); 
    const scoreCounterRef = useRef(0);
    const [reviewVocab, setReviewVocab] = useState([]);

    useEffect(() => {
        const importImages = async () => {
            const paths = [];
            for (const category of checkedVocab) {
                const categoryImages = await fetchImagesFromServer(category);
                paths.push(...categoryImages);
            }
            setImagePaths(paths);
        };
        importImages();
    }, [checkedVocab]);

    const fetchImagesFromServer = async (category) => {
        try {
            const response = await fetch(`https://storage.googleapis.com/storage/v1/b/illustrations_bucket/o?prefix=${category}/`);
            if (!response.ok) {
                throw new Error('Failed to fetch images');
            }
            const data = await response.json();
            if (data.items) {
                const paths = data.items.filter(item => item.name.endsWith(".png")); // Filter out only items ending with ".png"
                const imagePromises = paths.map(async (item) => {
                    const imageUrl = item.mediaLink;
                    try {
                        const imageResponse = await fetch(imageUrl);
                        if (!imageResponse.ok) {
                            throw new Error(`Failed to fetch image: ${imageUrl}`);
                        }
                        const imageBlob = await imageResponse.blob();
                        return URL.createObjectURL(imageBlob);
                    } catch (fetchError) {
                        console.error('Error fetching image:', fetchError);
                        console.error('Failed image URL:', imageUrl);
                        return null; // Returning null for failed images
                    }
                });
                return Promise.all(imagePromises);
            } else {
                throw new Error(`No images found in the ${category} folder`);
            }
        } catch (error) {
            console.error('Error fetching images:', error);
            return [];
        }
    };
    
    // FIX: repeat images
    // Aim to remove images from the fetched container that have already been rendered. NO REPEATS.
    // Once the user reaches the end of their fetched collection, take the user to the Score Screen with MAX points.

    useEffect(() => {
        renderRandomImage();
    }, [imagePaths]);

    const renderRandomImage = () => {
        if (imagePaths && imagePaths.length > 0) {
            const randomIndex = Math.floor(Math.random() * imagePaths.length);
            setRandomImagePath(imagePaths[randomIndex]);
        }
    };

    const handleClick = (buttonId) => {
        switch (buttonId) {
            case "btnCorrect":
                setScoreCounter((scoreCounter) => scoreCounter + 1);
                playCorrectPing();
                confetti({
                    particleCount: 50,
                    startVelocity: 30,
                    spread: 360,
                    origin: {
                      x: Math.random(), y: Math.random() - 0.2
                    }
                  });
                renderRandomImage();
                break;
            case "btnIncorrect":
                addToReview();
                playIncorrectPing();
                renderRandomImage();
                break;
            default:
                break;
        }
    }

    const addToReview = () => {
        setReviewVocab(prevReviewVocab => {
            return [...prevReviewVocab, randomImagePath];
        });
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimerDuration((prevTimerDuration) => {
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
    },  [timeLimit]);

    useEffect(() => {
        scoreCounterRef.current = scoreCounter;
    }, [scoreCounter]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60).toString().padStart(1, '0')
        const secs = (seconds % 60).toString().padStart(2, '0')
        return `${mins}:${secs}`
    }

    const handleTimerFinish = () => {
        onGameFinish(scoreCounterRef.current);
        onSelectOption('ScoreScreen', checkedVocab, scoreCounterRef.current, timeLimit);
    }

    return (
        <>  
            <div id="countdown">
                <img src={clock} alt="Clock"/>
                <h1>{formatTime(timerDuration)}</h1>
            </div>
            <div className="game">
                {randomImagePath && (
                    <div id="quizItem">
                        <img src={randomImagePath} alt="Random Image" />
                    </div>
                )} 
                <div id="answerBtns">
                    <button id="btnCorrect" onClick={() => handleClick('btnCorrect') }>
                        <img className="icon" src={correct} alt="Correct" />
                    </button>
                    <button id="btnIncorrect" onClick={() => handleClick('btnIncorrect')}>
                        <img className="icon" src={incorrect} alt="Incorrect" />
                    </button>
                </div>
            </div>
            <div className="controls">
                {handleControls("btnReturn", onSelectOption)}
            </div>
        </>
    );
};

export default GameScreen;
