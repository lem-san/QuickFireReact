import './MainMenu.css'
import { Fragment } from 'react'
import logo from './assets/logo.png'
import bg from './assets/bgAnimation.mp4'
import click from './assets/menu.mp3'

function MainMenu() {

    function playSound() {
        new Audio(click).play();
    }

    return (
        <>
            <video autoPlay muted loop id="bgAnimation">
                <source src={bg} type="video/mp4"/>
            </video>
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
        </>
    )
}

export default MainMenu