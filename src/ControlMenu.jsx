import musicOn from './assets/musicOn.png'
import musicOff from './assets/musicOff.png'
import info from './assets/info.png'
import React, {useState} from 'react'
import bgMusic from './assets/audio/bgMusic1.mp3'
import {playClick} from './Sounds'
import { stopSounds } from './Sounds'
import mainMenuIcon from './assets/mainMenuIcon.png'
import returnIcon from './assets/returnIcon.png'
import oneMoreTime from './assets/oneMoreTime.png'
import fullscreen from './assets/fullscreen.png'
import nextIcon from './assets/nextIcon.png'
import reviewIcon from './assets/reviewIcon.png'
import './ControlMenu.css'

const ControlMenu = () => {
    return (
        <></>
    )
}

export const handleControls = (controlId, onSelectOption) => {

    // for bg sound control
    const [audio] = useState(new Audio(bgMusic))
    const [isPlaying, isPaused] = useState(false)

    // FIX: Playback begins new track, once the user returns to Main Menu,
    //      even if the track is already playing (double audio).
    function togglePlayback() {
        if (isPlaying) {
            audio.pause()
        } else {
            audio.play()
        }
        isPaused(!isPlaying)
    }

    // Fullscreen view + error catch
    const [isFullscreen, setIsFullscreen] = useState(false);
    const toggleFullscreen = () => {
        playClick();
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().then(() => {
            setIsFullscreen(true);
          }).catch((err) => {
            console.error('Failed to enter fullscreen mode:', err);
          });
        } else {
          document.exitFullscreen().then(() => {
            setIsFullscreen(false);
          }).catch((err) => {
            console.error('Failed to exit fullscreen mode:', err);
          });
        }
      };

      const handleClick = (buttonId) => {
        playClick();
        switch (buttonId) {
            case "btnInfo":
                return onSelectOption('Info');
            case "btnMainMenu":
                stopSounds();
                return onSelectOption('MainMenu');  
            case "btnReturn":
                stopSounds();
                return onSelectOption('MainMenu');  
            case "btnFullscreen":
                toggleFullscreen();
                break;    
            case "btnNext":
                return onSelectOption('GameScreen');
            case "btnOneMore":
                stopSounds();
                return onSelectOption('GameScreen');
            case "btnReview":
                stopSounds();
                return onSelectOption('ReviewScreen');
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
        case "btnMainMenu":
            return <button id="btnMainMenu" onClick={() => handleClick('btnMainMenu')}><img class="icon" src={mainMenuIcon}/></button>;
        case "btnReturn":
            return <button id="btnReturn" onClick={() => handleClick('btnReturn')}><img class="icon" src={returnIcon}/></button>;
        case "btnOneMore":
            return <button id="btnOneMore" onClick={() => handleClick('btnOneMore')}><img class="icon" src={oneMoreTime} /></button>;
        case "btnFullscreen":
            return <button id="btnFullscreen" onClick={() => handleClick('btnFullscreen')}><img class="icon" src={fullscreen} /></button>;
        case "btnNext": 
            return <button id="btnNext" onClick={() => handleClick('btnNext')}><img class="icon" src={nextIcon} /></button>;
        case "btnReview":
            return <button id="btnReview" onClick={() => handleClick('btnReview')}><img className='icon' src={reviewIcon} /></button>
        default:
            break;
    }
}

export default ControlMenu