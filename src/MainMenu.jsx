import './MainMenu.css'
import { Fragment } from 'react'
import logo from './assets/logo.png'
import musicOn from './assets/musicOn.png'
import musicOff from './assets/musicOff.png'
import info from './assets/info.png'
import React, {useState} from 'react'
import bgMusic from './assets/audio/bgMusic1.mp3'
import {playClick} from './Sounds'
import returnIcon from './assets/returnIcon.png'
import oneMoreTime from './assets/oneMoreTime.png'

const MainMenu = ({onSelectOption}) => {
    const [audio] = useState(new Audio(bgMusic))
    const [isPlaying, isPaused] = useState(false)

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
            case "btnNormal":
                return onSelectOption('NormalMode');
            case "btnInfo":
                return onSelectOption('Info');
            case "btnReturn": 
                return onSelectOption('MainMenu');
            default:
            break;
        }
    }
    
    return (
        <>
            <audio id="menuClick" src="assets/menu.mp3"></audio>
            <audio id="toggleClick" src="assets/toggle.mp3"></audio>
            <div class="menu">
                <img id="logo" src={logo}/>
                <div id="btnMenu">
                    <button id="btnNormal" onClick={() => handleClick('btnNormal')}>Normal</button>
                    <button id="btnRanked" onClick={playClick}>Ranked</button>
                    <button id="btnLeaderboards" onClick={playClick}>Leaderboards</button>
                    <button id="btnSettings" onClick={playClick}>Settings</button>
                </div>
            </div>
            <div id="iconMenu">
                <button id="btnMusic" onClick={togglePlayback}>
                    {isPlaying ? <img class="icon" src={musicOff}/> : <img class="icon" src={musicOn}/>}
                </button>
                <button id="btnInfo" onClick={() => handleClick('btnInfo')}><img class="icon" src={info}/></button>
                <button id="btnReturn" onClick={() => handleClick('btnReturn')}><img class="icon" src={returnIcon}/></button>
                <button id="btnOneMore" onClick={playClick}><img class="icon" src={oneMoreTime} /></button>
            </div>
        </>
    )
}

export default MainMenu