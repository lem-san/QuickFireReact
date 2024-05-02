import React, { useState, useEffect, useRef } from 'react';
import './GameScreen.css'
import { handleControls } from './ControlMenu';
import correct from './assets/correct.png';
import incorrect from './assets/incorrect.png'
import confetti from 'https://cdn.skypack.dev/canvas-confetti';
import {playCorrectPing, playIncorrectPing, playCountdownTheme} from './Sounds'
import clock from './assets/countdownClock.png'

const GameScreen = ({ onSelectOption, checkedVocab, onGameFinish, timeLimit }) => {
    const [imagePaths, setImagePaths] = useState([]);
    const [randomImagePath, setRandomImagePath] = useState(null);
    const [scoreCounter, setScoreCounter] = useState(0); 
    const [timerDuration, setTimerDuration] = useState(timeLimit); 
    const scoreCounterRef = useRef(0);
    const [reviewVocab, setReviewVocab] = useState([])

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
                    case 'Occupations':
                        const occupationsImages = await import.meta.glob('./assets/illustrations/occupations/*.png');
                        paths.push(...Object.values(occupationsImages).map(image => image()));
                        break;   
                    case 'Stationery':
                        const stationeryImages = await import.meta.glob('./assets/illustrations/stationery/*.png');
                        paths.push(...Object.values(stationeryImages).map(image => image()));
                        break;    
                    case 'FoodDrink':
                        const foodDrinkImages = await import.meta.glob('./assets/illustrations/foodDrink/*.png');
                        paths.push(...Object.values(foodDrinkImages).map(image => image()));
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
                addToReview();
                console.log(reviewVocab)
                playIncorrectPing();
                renderRandomImage();
                break;
        }
    }

    const addToReview = () => {
        setReviewVocab(prevReviewVocab => {
            // Add the current randomImagePath to the reviewVocab array
            return [...prevReviewVocab, randomImagePath];
        });
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
        onGameFinish(scoreCounterRef.current)
        onSelectOption('ScoreScreen', checkedVocab, scoreCounterRef.current, timeLimit)
    }

    return (
        <>  
            <div id="countdown">
                <img src={clock}/>
                <h1>{formatTime(timerDuration)}</h1>
            </div>
            <div class="game">
            {randomImagePath && (
                <div id="quizItem">
                    <img src={randomImagePath} alt="Random Image" />
                </div>
            )} 
            <div id="answerBtns">
                <button id="btnCorrect" onClick={() => handleClick('btnCorrect')}><img class="icon" src={correct}/></button>
                <button id="btnIncorrect" onClick={() => handleClick('btnIncorrect')}><img class="icon" src={incorrect}/></button>
            </div>
            </div>
            <div class="controls">
                {handleControls("btnReturn", onSelectOption)}
            </div>
        </>
    );
};

export default GameScreen;