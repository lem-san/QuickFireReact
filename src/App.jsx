import React, { useState } from 'react';
import MainMenu from "./MainMenu"
import OptionsMenu from "./OptionsMenu"
import bg from './assets/bgAnimation.mp4'
import Info from './Info';
import GameScreen from './GameScreen';
import ScoreScreen from './ScoreScreen';

function App() {
  const [currentPage, setCurrentPage] = useState('MainMenu');
  const [checkedVocab, setCheckedVocab] = useState([])
  const [currentScore, setCurrentScore] = useState(0)
  const [timerFinished, setTimerFinished] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [gameScreenVisible, setGameScreenVisible] = useState(true);

  // TODO: Current game state
  const [currentGame, setCurrentGame] = useState(checkedVocab)

  function handleOptionSelect(option, categories = [], score) {
    setCurrentPage(option);
    setCheckedVocab(categories);
    setCurrentScore(score)
    if (option != 'GameScreen') {
      // Reset to MainMenu when returning from other screens
      setTimerFinished(false);
      setGameScreenVisible(true);
    }
  }
  
  function handleGameFinish(score) {
    setGameScore(score);
    setTimerFinished(true);
    setGameScreenVisible(false)
  }

  function renderOption() {
    switch (currentPage) {
      case 'NormalMode':
        return <OptionsMenu onSelectOption={handleOptionSelect} />;
      case 'Info':
        return <Info onSelectOption={handleOptionSelect} />;
      case 'MainMenu':
        return <MainMenu onSelectOption={handleOptionSelect} />;
      case 'GameScreen':
        return gameScreenVisible ? ( <GameScreen 
          checkedVocab={checkedVocab}  
          onSelectOption={handleOptionSelect}
          onGameFinish={handleGameFinish}
        /> ) : null
        case 'ScoreScreen':
          return <ScoreScreen score={gameScore} onSelectOption={handleOptionSelect} />;
      default:
        return <MainMenu onSelectOption={handleOptionSelect} />;
    }
  }

  return (
    <>
      {currentPage !== 'GameScreen' && (
        <video autoPlay muted loop id="bgAnimation">
          <source src={bg} type="video/mp4"/>
        </video>
      )}
      {renderOption()}
      {timerFinished && <ScoreScreen score={gameScore} onSelectOption={handleOptionSelect} />}
    </>
  )
}

export default App
