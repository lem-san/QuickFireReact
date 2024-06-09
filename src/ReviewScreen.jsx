import React from 'react';
import { useState, useEffect } from 'react';
import './ReviewScreen.css';
import reviewLogo from './assets/reviewLogo.png';
import prevButton from './assets/previousReview.png';
import nextButton from './assets/nextReview.png';
import { handleControls } from "./ControlMenu"; 

const ReviewScreen = ({ onSelectOption, reviewVocab }) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < reviewVocab.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const currentVocabItem = reviewVocab[currentIndex];

    return (
        <>
            <img id="reviewLogo" src={reviewLogo} alt="Review" />
            <div className='game' style={{ background: "radial-gradient(circle, rgb(255, 246, 113) 0%, rgb(255, 188, 3) 100%)" }}>
                <div id="reviewItems">
                    <img src={currentVocabItem.image} alt={currentVocabItem.english} />
                    <h2 className='reviewText'>{currentVocabItem.english}</h2>
                </div>
                <div id="reviewBtnsDiv">
                    <button className={`reviewBtns ${currentIndex === 0 ? 'hidden' : ''}`} onClick={handlePrevious}>
                        <img style={{ width: "150px" }} src={prevButton} alt="Previous" />
                    </button>
                    <button className={`reviewBtns ${currentIndex === reviewVocab.length - 1 ? 'hidden' : ''}`} onClick={handleNext}>
                        <img style={{ width: "150px" }} src={nextButton} alt="Next" />
                    </button>
                </div>
            </div>
            <div className="controls">
                {handleControls("btnReturn", onSelectOption)}
            </div>
        </>
    );
};

export default ReviewScreen;
