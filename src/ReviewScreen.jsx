import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import './ReviewScreen.css';
import reviewLogo from './assets/reviewLogo.png';
import prevButton from './assets/previousReview.png';
import nextButton from './assets/nextReview.png';
import { handleControls } from "./ControlMenu"; 
import returnIcon from "./assets/returnIcon.png"
const ReviewScreen = ({onSelectOption, checkedVocab, score, timeLimit, questionType, reviewVocab}) => {

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

    const handleKeyDown = useCallback(
        (event) => {
          if (event.key === 'ArrowLeft') {
            handlePrevious()
          } else if (event.key === 'ArrowRight') {
            handleNext();
          }
        }
      )
    
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, [handleKeyDown]);

    const currentVocabItem = reviewVocab[currentIndex];

    const DelayedText = () => {
        const [vocabText, setVocabText] = useState('');
      
        useEffect(() => {
          // Use setTimeout to update the message after 2000 milliseconds (2 seconds)
          const timeoutId = setTimeout(() => {
            setVocabText(currentVocabItem.english);
          }, 3000);
      
          // Cleanup function to clear the timeout if the component unmounts
          return () => clearTimeout(timeoutId);
        }, []); // Empty dependency array ensures the effect runs only once
      
        return (
          <div>
            <h2 className="reviewText">{vocabText}</h2>
          </div>
        );
      };

      const handleBackButtonClick = () => {
        onSelectOption('ScoreScreen', checkedVocab, score, timeLimit, questionType, reviewVocab);
    };

    return (
        <>
            <img id="reviewLogo" src={reviewLogo} alt="Review" />
            <div className='game' style={{ background: "radial-gradient(circle, rgb(255, 246, 113) 0%, rgb(255, 188, 3) 100%)" }}>
                <div id="reviewItems">
                    <img src={currentVocabItem.image} alt={currentVocabItem.english} />
                    <DelayedText />
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
                {handleControls("btnMenu", onSelectOption)}

                {/* TODO: Fix this. Incorporate into ControlMenu component. */}
                <button id="btnReturn" onClick={handleBackButtonClick}><img className="icon" src={returnIcon}/></button>
            </div>
        </>
    );
};

export default ReviewScreen;
