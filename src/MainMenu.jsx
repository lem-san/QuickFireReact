import './MainMenu.css'
import logo from './assets/logo.png'
import React, {useState} from 'react'
import {playClick} from './Sounds'
import {handleControls} from './ControlMenu'

const MainMenu = ({onSelectOption}) => {

    const handleClick = (buttonId) => {
        playClick();
        switch (buttonId) {
            case "btnNormal":
                return onSelectOption('NormalMode');
            case "btnTeam":
            case "btnLeaderboards":
            case "btnSettings":
            default: break;
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
                        <button id="btnTeam" onClick={() => handleClick('btnTeam')}>Team Battle</button>
                        <button id="btnLeaderboards" onClick={playClick}>Leaderboards</button>
                        <button id="btnSettings" onClick={playClick}>Settings</button>
                    </div>
                </div>
                    <div class="controls">
                        {handleControls('btnInfo', onSelectOption)}
                        {handleControls('btnMusic')}
                        {handleControls('btnFullscreen')}
                    </div>
        </>
    )
}

export default MainMenu