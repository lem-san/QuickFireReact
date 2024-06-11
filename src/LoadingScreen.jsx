import React, { useEffect, useState } from 'react';
import './LoadingScreen.css'; // Create this CSS file for styling

const LoadingScreen = ({ categories }) => {
  const [progress, setProgress] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(categories[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 100 / (categories.length * 2);
      });

      setCurrentCategory((prevCategory) => {
        const currentIndex = categories.indexOf(prevCategory);
        return categories[(currentIndex + 1) % categories.length];
      });
    }, 500); // Update every 500ms

    return () => clearInterval(interval);
  }, [categories]);

  return (
    <div className="loading-screen">
      <div className="loading-bar" style={{ width: `${progress}%` }}></div>
      <p>Loading {currentCategory}...</p>
    </div>
  );
};

export default LoadingScreen;
