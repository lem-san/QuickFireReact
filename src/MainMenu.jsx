import './MainMenu.css'
import logo from './assets/logo.png'
import React, {useState} from 'react'
import {playClick} from './Sounds'
import {handleControls} from './ControlMenu'
// import { FullScreen, useFullScreenHandle } from 'react-full-screen'

const MainMenu = ({onSelectOption}) => {

    // const [isFullScreen, setIsFullScreen] = useState(false);

    // const handleToggleFullScreen = () => {
    //     setIsFullScreen(!isFullScreen)
    // }

    const handleClick = (buttonId) => {
        playClick();
        switch (buttonId) {
            case "btnNormal":
                return onSelectOption('NormalMode');
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
                {handleControls('btnMusic', onSelectOption)}
                {handleControls('btnInfo', onSelectOption)}
                {handleControls('btnFullscreen', onSelectOption)}
        </>
    )
}

export default MainMenu