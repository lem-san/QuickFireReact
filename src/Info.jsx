import './Info.css'
import info from './assets/info.png'
import question from './assets/question.png'
import point from './assets/point.png'
import caution from './assets/caution.png'
import {handleControls} from './ControlMenu'

const Info = ({onSelectOption}) => {
    
    return (
        <>
            <div id="infoWindow">
                <img id="icon" src={info}/>            
                <h1 class="illustrations"><img id="question" src={question}/>WHAT'S THIS?</h1>
                <p>The aim of this game is to challenge another person (and or group/class) through a variety of vocab-drilling exercises! </p>
                <h1 class="illustrations"><img id="point" src={point}/>HOW TO PLAY:</h1>
                <p>A variety of illustrations will appear on the screen. Say each word (in English) corresponding to the illustration and, if correct, a point is awarded. If incorrect, no point is awarded. Aim to get as many points before the time runs out!</p>
                <h1 class="illustrations"><img  id="caution" src={caution}/>DISCLAIMER:</h1>
                <p>This is predominantly a teaching tool. It requires someone familiar with the intended vocabulary to indicate whether the answers given are correct or not. It's recommended that a teacher facilitates the activity, pressing the correct/incorrect buttons.
                    There will be future updates to include a 'solo-play' mode, allowing students to play without the need of teacher assistance. Stay tuned!</p>
            </div>
            <div class="controls">            
                {handleControls('btnReturn', onSelectOption)}
            </div>
        </>
    )
}

export default Info