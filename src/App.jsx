import React, { useState, useEffect } from 'react';
import MainMenu from "./MainMenu";
import OptionsMenu from "./OptionsMenu";
import bg from './assets/bgAnimation.mp4';
import Info from './Info';
import GameScreen from './GameScreen';
import ScoreScreen from './ScoreScreen';
import ReviewScreen from './ReviewScreen';

function App() {
  const [currentPage, setCurrentPage] = useState('MainMenu');
  const [checkedVocab, setCheckedVocab] = useState([]);
  const [timerFinished, setTimerFinished] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [gameScreenVisible, setGameScreenVisible] = useState(true);
  const [gameTimeLimit, setGameTimeLimit] = useState(0);
  const [questionType, setQuestionType] = useState([]);
  const [reviewVocab, setReviewVocab] = useState([]);

  function handleOptionSelect(option, categories = [], score, timeLimit, questionType, reviewVocab = []) {
    setCurrentPage(option);
    setCheckedVocab(categories);
    setGameScore(score);
    setGameTimeLimit(timeLimit);
    setQuestionType(questionType);
    setReviewVocab(reviewVocab);
    
    if (option !== 'GameScreen') {
      // Reset to MainMenu when returning from other screens
      setTimerFinished(false);
      setGameScreenVisible(true);
    }
  }

  function handleGameFinish(score, reviewVocab) {
    setGameScore(score);
    setReviewVocab(reviewVocab);
    setTimerFinished(true);
    setGameScreenVisible(false);
    setCurrentPage('ScoreScreen');
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
        return gameScreenVisible ? (
          <GameScreen
            onSelectOption={handleOptionSelect}
            checkedVocab={checkedVocab}
            onGameFinish={handleGameFinish}
            timeLimit={gameTimeLimit}
            questionType={questionType}
          />
        ) : null;
      case 'ScoreScreen':
        return (
          <ScoreScreen
            onSelectOption={handleOptionSelect}
            checkedVocab={checkedVocab}
            score={gameScore}
            timeLimit={gameTimeLimit}
            questionType={questionType}
            reviewVocab={reviewVocab}
          />
        );
      case 'ReviewScreen':
        return (
          <ReviewScreen
            onSelectOption={handleOptionSelect}
            checkedVocab={checkedVocab}
            score={gameScore}
            timeLimit={gameTimeLimit}
            questionType={questionType}
            reviewVocab={reviewVocab}
          />
        );
      default:
        return <MainMenu onSelectOption={handleOptionSelect} />;
    }
  }

  return (
    <>
      {currentPage !== 'GameScreen' && (
        <video autoPlay muted loop id="bgAnimation">
          <source src={bg} type="video/mp4" />
        </video>
      )}
      {renderOption()}
    </>
  );
}

export default App;
