import './App.css'
import React, { useState } from 'react';
import MainMenu from "./MainMenu"
import OptionsMenu from "./OptionsMenu"
import bg from './assets/bgAnimation.mp4'
import Info from './Info';

function App() {
  const [currentOption, setCurrentOption] = useState('MainMenu');

  function renderOption() {
    switch (currentOption) {
      case 'NormalMode':
        return <OptionsMenu />;
      case 'Info':
        return <Info />;
      case 'MainMenu':
        return <MainMenu onSelectOption={setCurrentOption}/>;
      default:
        return <MainMenu onSelectOption={setCurrentOption} />;
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
