import React from 'react';
import { useState, useEffect } from 'react';
import './ReviewScreen.css';
import reviewLogo from './assets/review.png';
import prevButton from './assets/previousReview.png';
import nextButton from './assets/nextReview.png';
import { handleControls } from "./ControlMenu"; 

const ReviewScreen = ({ onSelectOption, reviewVocab }) => {

    useEffect(() => {
        console.log("ReviewScreen mounted with reviewVocab:", reviewVocab);
      }, [reviewVocab]);

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviewVocab.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + reviewVocab.length) % reviewVocab.length);
    };

    const currentVocab = reviewVocab[currentIndex];

    return (
        <>
            <img id="reviewLogo" src={reviewLogo} alt="Review" />
            <div className='game' style={{ background: "radial-gradient(circle, rgb(255, 246, 113) 0%, rgb(255, 188, 3) 100%)" }}>
                <div id="quizItem">{currentVocab}</div>
                <div id="review">
                    <button className='reviewBtns' onClick={handlePrev}>
                        <img style={{ width: "150px" }} src={prevButton} alt="Previous" />
                    </button>
                    <button className='reviewBtns' onClick={handleNext}>
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
