import { handleControls } from "./ControlMenu"; 

const ScoreScreen = ({score, onSelectOption}) => {

    function renderScore() {
        if (score) {
            return score
        } else {
            return "undefined"
        }
    }

    return (
        <>
            <div id="mainView">
                <h1>Score: {renderScore()}</h1>
                <div id="controlMenu">
                    {handleControls("btnReturn", onSelectOption)}
                    {handleControls("btnOneMore", onSelectOption)}
                </div>
            </div>
        </>
    )
}

export default ScoreScreen