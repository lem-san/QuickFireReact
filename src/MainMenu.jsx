import './MainMenu.css'
import { Fragment } from 'react'
import logo from './assets/logo.png'
import click from './assets/menu.mp3'
import musicOn from './assets/musicOn.png'
import musicOff from './assets/musicOff.png'
import info from './assets/info.png'
import React, {useState} from 'react'
import bgMusic from './assets/audio/bgMusic1.mp3'

function MainMenu() {
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

    function playSound() {
        new Audio(click).play();
    }

    return (
        <>
            <audio id="menuClick" src="assets/menu.mp3"></audio>
            <audio id="toggleClick" src="assets/toggle.mp3"></audio>
            <div class="menu">
                <img id="logo" src={logo}/>
                <div id="btnMenu">
                    <button id="btnNormal" onClick={playSound}>Normal</button>
                    <button id="btnRanked" onClick={playSound}>Ranked</button>
                    <button id="btnLeaderboards" onClick={playSound}>Leaderboards</button>
                    <button id="btnSettings" onClick={playSound}>Settings</button>
                </div>
            </div>
            <div id="iconMenu">
                <button id="btnMusic" onClick={togglePlayback}>
                    {isPlaying ? <img class="icon" src={musicOff}/> : <img class="icon" src={musicOn}/>}
                </button>
                <button id="btnInfo" ><img class="icon" src={info}/></button>
            </div>
        </>
    )
}

export default MainMenu