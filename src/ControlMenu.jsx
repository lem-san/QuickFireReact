import musicOn from './assets/musicOn.png'
import musicOff from './assets/musicOff.png'
import info from './assets/info.png'
import React, {useState} from 'react'
import bgMusic from './assets/audio/bgMusic1.mp3'
import {playClick} from './Sounds'
import returnIcon from './assets/returnIcon.png'
import oneMoreTime from './assets/oneMoreTime.png'
import fullscreen from './assets/fullscreen.png'
// import {FullScreen, useFullScreenHandle} from 'react-full-screen'

const ControlMenu = ({onSelectOption}) => {
    return (
        <></>
    )
}

export const handleControls = (controlId, onSelectOption) => {
    // for bg sound control
    const [audio] = useState(new Audio(bgMusic))
    const [isPlaying, isPaused] = useState(false)

    // const handleFullScreen = () => {
    //     setIsFullScreen(!isFullScreen)
    // }

    function togglePlayback() {
        if (isPlaying) {
            audio.pause()
        } else {
            audio.play()
        }
        isPaused(!isPlaying)
    }

    const handleClick = (buttonId) => {
        playClick();
        switch (buttonId) {
            case "btnInfo":
                return onSelectOption('Info');
            case "btnReturn":
                return onSelectOption('MainMenu');
            // case "btnFullscreen":
            //     handleFullScreen();
            //     break;
            default:
                break;
        }
    }

    switch(controlId) {
        case "btnMusic":
            return <button id="btnMusic" onClick={togglePlayback}>
                {isPlaying ? <img class="icon" src={musicOff}/> : <img class="icon" src={musicOn}/>}
            </button>;
        case "btnInfo":
            return <button id="btnInfo" onClick={() => handleClick('btnInfo')}><img class="icon" src={info}/></button>;
        case "btnReturn":
            return <button id="btnReturn" onClick={() => handleClick('btnReturn')}><img class="icon" src={returnIcon}/></button>;
        case "btnOneMore":
            return <button id="btnOneMore" onClick={playClick}><img class="icon" src={oneMoreTime} /></button>;
        case "btnFullscreen":
            return <button id="btnFullscreen" onClick={playClick}><img class="icon" src={fullscreen} /></button>;
        default:
            break;
    }
}

export default ControlMenu