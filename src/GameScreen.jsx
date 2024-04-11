import React, { useState, useEffect } from 'react';
import './GameScreen.css'

const GameScreen = ({ checkedVocab }) => {
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
                    // Add more cases for other categories as needed
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
                renderRandomImage();
            case "btnIncorrect":
                renderRandomImage();
        }
    }

    return (
        <>
            {randomImagePath && (
                <div>
                    <img id="quizItem" src={randomImagePath} alt="Random Image" />
                </div>
            )} 
            <button id="btnCorrect" onClick={() => handleClick('btnCorrect')}></button>
            <button id="btnIncorrect" onClick={() => handleClick('btnIncorrect')}></button>
            <h1>{scoreCounter}</h1>
        </>
    );
};

export default GameScreen;