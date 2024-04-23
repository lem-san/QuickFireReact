import { handleControls } from "./ControlMenu"; 
import star from "./assets/star.png"
import wellDone from "./assets/wellDone.svg"
import "./ScoreScreen.css"
import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import ConfettiGenerator from 'confetti-js';

const ScoreScreen = ({score, onSelectOption}) => {
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

        // Clean up the confetti instance when component unmounts
        return () => confetti.clear();
    }, []);

    return (
        <>
            <div id="mainView">
                <canvas id="confettiCanvas"/>
                <img id="wellDoneLogo" src={wellDone} />
                <h1 id="scoreTitle">In X , you have scored ...</h1>
                <h1 id="scoreCount">
                    <PopWrapper>
                        <img src={star} alt="Star" />
                    </PopWrapper>
                    {count}
                </h1>
                <div id="controlMenu">
                    {handleControls("btnReturn", onSelectOption)}
                    {handleControls("btnOneMore", onSelectOption)}
                </div>
            </div>
        </>
    );
}


export default ScoreScreen;