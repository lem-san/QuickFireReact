import React from 'react';
import click from './assets/menu.mp3'
import toggleClick from './assets/toggle.mp3'
import correctPing from './assets/correct.mp3'
import incorrectPing from './assets/incorrect.mp3'
import countdownTheme from './assets/countdownTheme.mp3'
import congratsJingle from './assets/congrats.mp3'

const cdTheme = new Audio(countdownTheme)
const congrats = new Audio(congratsJingle)

export const playClick = () => {
  new Audio(click).play();
  };

export const playToggleClick = () => {
  new Audio(toggleClick).play()
}

export const playCorrectPing = () => {
  const correct = new Audio(correctPing)
  correct.volume = 0.3
  correct.play()
}

export const playIncorrectPing = () => {
  const incorrect = new Audio(incorrectPing)
  incorrect.volume = 0.3
  incorrect.play()
}

export const playCountdownTheme = () => {
  cdTheme.volume = 0.3
  cdTheme.play()
}

export const playCongratulationsJingle = () => {
  congrats.play()
}

export const stopSounds = () => {
  cdTheme.pause()
  cdTheme.currentTime = 0;
  congrats.pause()
  congrats.currentTime = 0;
}

const Sounds = () => {
    return <></>;
  };

export default Sounds