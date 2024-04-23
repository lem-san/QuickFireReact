import React, { useState, useEffect, useRef } from 'react';
import './GameScreen.css'
import { handleControls } from './ControlMenu';
import CountdownTimer from './CountdownTimer';
import correct from './assets/correct.png';
import incorrect from './assets/incorrect.png'
import confetti from 'https://cdn.skypack.dev/canvas-confetti';
import {playCorrectPing, playIncorrectPing} from './Sounds'
import ScoreScreen from './ScoreScreen';
import clock from './assets/countdownClock.png'


const GameScreen = ({ checkedVocab, onSelectOption, onGameFinish }) => {
    const [imagePaths, setImagePaths] = useState([]);
    const [randomImagePath, setRandomImagePath] = useState(null);
    const [scoreCounter, setScoreCounter] = useState(0); 
    const [timerDuration, setTimerDuration] = useState(5); // Initial duration of 5 seconds
    const [timerFinished, setTimerFinished] = useState(false);
    const scoreCounterRef = useRef(0);

    useEffect(() => {
        const importImages = async () => {
            const paths = [];
            for (const category of checkedVocab) {
                switch (category) {
                    case 'Fruits':
                        const fruitsImages = await import.meta.glob('./assets/illustrations/fruits/*.png');
                        paths.push(...Object.values(fruitsImages).map(image => image()));
                        break;
                    case 'Vegetables':
                        const vegetablesImages = await import.meta.glob('./assets/illustrations/vegetables/*.png');
                        paths.push(...Object.values(vegetablesImages).map(image => image()));
                        break;
                    case 'Animals':
                        const animalsImages = await import.meta.glob('./assets/illustrations/animals/*.png');
                        paths.push(...Object.values(animalsImages).map(image => image()));
                        break;
                    case 'Sports':
                        const sportsImages = await import.meta.glob('./assets/illustrations/sports/*.png');
                        paths.push(...Object.values(sportsImages).map(image => image()));
                        break;
                    // TODO: categories continued here
                    default:
                        break;
                }
            }
            setImagePaths(await Promise.all(paths));
        };

        importImages();
    }, [checkedVocab]);


    // This useEffect is for the initial game screen image. 
    useEffect(() => {
        renderRandomImage();
    }, [imagePaths]);

    const renderRandomImage = () => {
        if (imagePaths.length > 0) {
            const randomIndex = Math.floor(Math.random() * imagePaths.length);
            setRandomImagePath(imagePaths[randomIndex].default);
        }
    }

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
                playIncorrectPing();
                renderRandomImage();
                break;
        }
    }

    useEffect(() => {
        // Start the countdown timer
        const timer = setInterval(() => {
            setTimerDuration((prevTimerDuration) => {
                if (prevTimerDuration === 0) {
                    handleTimerFinish()
                    clearInterval(timer);
                    return 0;
                } else if (prevTimerDuration === 32) {
                    playCountdownTheme(); // Play countdown theme at 32 seconds
                }
                return prevTimerDuration - 1;
            });
        }, 1000);

        // Cleanup function to clear the timer
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        scoreCounterRef.current = scoreCounter;
    }, [scoreCounter]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60).toString().padStart(1, '0')
        const secs = (seconds % 60).toString().padStart(2, '0')
        return `${mins}:${secs}`
    }


    // TODO: Needs fixing
    const handleTimerFinish = () => {
        console.log(scoreCounterRef.current)
        onGameFinish(scoreCounterRef.current)
    }

    return (
        <>
        <div class="game">
        <div id="countdown">
                <img src={clock}/>
                <h1>{formatTime(timerDuration)}</h1>
            </div>  
            {randomImagePath && (
                <div id="quizItem">
                    <img src={randomImagePath} alt="Random Image" />
                </div>
            )} 
            <div id="answerBtns">
                <button id="btnCorrect" onClick={() => handleClick('btnCorrect')}><img class="icon" src={correct}/></button>
                <button id="btnIncorrect" onClick={() => handleClick('btnIncorrect')}><img class="icon" src={incorrect}/></button>
            </div>
            <div id="controlMenu">
                {handleControls("btnReturn", onSelectOption)}
            </div>
        </div>
        {timerFinished && <ScoreScreen score={scoreCounterRef.current} />}
        </>
    );
};

export default GameScreen;