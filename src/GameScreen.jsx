import React, { useState, useEffect } from 'react';
import './GameScreen.css'
import { handleControls } from './ControlMenu';
import CountdownTimer from './CountdownTimer';
import correct from './assets/correct.png';
import incorrect from './assets/incorrect.png'
import confetti from 'https://cdn.skypack.dev/canvas-confetti';
import {playCorrectPing, playIncorrectPing} from './Sounds'

const GameScreen = ({ checkedVocab, onSelectOption }) => {
    const [imagePaths, setImagePaths] = useState([]);
    const [randomImagePath, setRandomImagePath] = useState(null);
    const [scoreCounter, setScoreCounter] = useState(0); 

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
                setScoreCounter((prevScore) => prevScore + 1);
                confetti({
                    particleCount: 100,
                    startVelocity: 30,
                    spread: 360,
                    origin: {
                      x: Math.random(), y: Math.random() - 0.2
                    }
                  });
                renderRandomImage();
                playCorrectPing();
                break;
            case "btnIncorrect":
                playIncorrectPing();
                renderRandomImage();
                break;
        }
    }

    return (
        <>
        <div class="game">
            <CountdownTimer duration={35} />
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
        </>
    );
};

export default GameScreen;