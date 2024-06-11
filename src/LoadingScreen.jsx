import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ categories }) => {
  return (
    <div className="loading-screen">
      <div className="loading-bar">
        <div className="progress"></div>
      </div>
      <p>Loading {categories}...</p>
    </div>
  );
};

export default LoadingScreen;