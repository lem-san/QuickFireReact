import './App.css'
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
      case 'NextPage': // Assuming 'NextPage' transitions to 'GameScreen'
        return <GameScreen checkedVocab={checkedVocab} />;
      default:
        return <MainMenu onSelectOption={handleOptionSelect} />;
    }
  }

  return (
    <>
      <video autoPlay muted loop id="bgAnimation">
        <source src={bg} type="video/mp4"/>
      </video>
      {renderOption()}
    </>
  )
}

export default App
