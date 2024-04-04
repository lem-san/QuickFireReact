import React from 'react';
import click from './assets/menu.mp3'
import toggleClick from './assets/toggle.mp3'

export const playClick = () => {
    new Audio(click).play();
  };

export const playToggleClick = () => {
    new Audio(toggleClick).play()
}

const Sounds = () => {
    return <></>;
  };

export default Sounds