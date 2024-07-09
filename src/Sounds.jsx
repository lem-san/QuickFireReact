import React from 'react';
import click from './assets/menu.mp3'
import toggleClick from './assets/toggle.mp3'
import correctPing from './assets/correct.mp3'
import incorrectPing from './assets/incorrect.mp3'
import countdownTheme from './assets/countdownTheme.mp3'
import congratsJingle from './assets/congrats.mp3'

const cdTheme = new Audio(countdownTheme)
const congrats = new Audio(congratsJingle)
const correct = new Audio(correctPing)
const incorrect = new Audio(incorrectPing)

export const playClick = () => {
  const pclick = new Audio(click)
  pclick.volume = 0.1
  pclick.play()
}

export const playToggleClick = () => {
  const toggle = new Audio(toggleClick)
  toggle.volume = 0.2
  toggle.play()
}

export const playCorrectPing = () => {
  stopGameSounds()
  correct.volume = 0.3
  correct.play()
}

export const playIncorrectPing = () => {
  stopGameSounds()
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

export const stopGameSounds = () => {
  correct.pause() 
  correct.currentTime = 0;
  incorrect.pause()
  incorrect.currentTime = 0;
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