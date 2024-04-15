import React, { useState } from 'react';
import MainMenu from "./MainMenu"
import OptionsMenu from "./OptionsMenu"
import bg from './assets/bgAnimation.mp4'
import Info from './Info';
import GameScreen from './GameScreen';

function App() {
  const [currentPage, setCurrentPage] = useState('MainMenu');
  const [checkedVocab, setCheckedVocab] = useState([])

  function handleOptionSelect(option, categories = []) {
    setCurrentPage(option);
    setCheckedVocab(categories);
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
      case 'NextPage':
        return <GameScreen checkedVocab={checkedVocab}  onSelectOption={handleOptionSelect} />;
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
    </>
  )
}

export default App
