import { handleControls } from "./ControlMenu"; 
import star from "./assets/star.png"
import wellDone from "./assets/wellDone.svg"
import "./ScoreScreen.css"
import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import ConfettiGenerator from 'confetti-js';
import { playCongratulationsJingle } from "./Sounds";

const ScoreScreen = ({onSelectOption, checkedVocab, score, timeLimit, questionType, reviewVocab}) => {
    const pop = keyframes`
        50% { transform: scale(1.2); }
    `;

    const PopWrapper = styled.div`
        display: inline-block;
        animation: ${pop} 0.3s linear alternate;
    `;

    const [count, setCount] = useState(0);

    useEffect(() => {
        if (count < score) {
            const interval = setInterval(() => {
                setCount(count + 1);
            }, 100);
            return () => clearInterval(interval);
        }
        playCongratulationsJingle();
    }, [count, score]);
    
    useEffect(() => {
        const confettiSettings = {
            target: 'confettiCanvas',
            max: 200,
            props: ['square', 'triangle', 'circle'],
            colors: [
                [165, 104, 246],
                [230, 61, 135],
                [0, 199, 228],
                [253, 214, 126],
            ],
            rotate: true,
        };    
          
        const confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();

        return () => confetti.clear();
    }, []);

    const handleOneMoreButton = () => {
        onSelectOption('GameScreen', checkedVocab, 0, timeLimit, questionType)
    }

    //TODO:    
      const handleReviewButton = () => {
        onSelectOption('ReviewScreen', reviewVocab);
      };

    return (
        <div id="mainView">
          <canvas id="confettiCanvas" />
          <img id="wellDoneLogo" src={wellDone} />
          <h1 id="scoreTitle">You have scored...</h1>
          <h1 id="scoreCount">
            <PopWrapper>
              <img src={star} alt="Star" />
            </PopWrapper>
            {count}
          </h1>
          <div className="controls">
            {handleControls("btnReturn", onSelectOption)}
            {handleControls("btnOneMore", handleOneMoreButton)}
            {handleControls("btnReview", handleReviewButton)}
          </div>
        </div>
      );
    };


export default ScoreScreen;