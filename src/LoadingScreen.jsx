import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ categories }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categoryMapping, setCategoryMapping] = useState([]);

  useEffect(() => {
    fetch('/vocabData/Categories.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setCategoryMapping(data);
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      });

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex < categories.length - 1) {
          return prevIndex + 1;
        } else {
          clearInterval(interval); 
          return prevIndex;
        }
      });
    }, 2200); 

    return () => clearInterval(interval);
  }, [categories.length]);

  const getLabelForCategory = (category) => {
    const mapping = categoryMapping.find((item) => item.checkedVocab === category);
    return mapping ? mapping.label : category;
  };

  return (
    <div className="loading-screen">
      <div className="loading-bar">
        <div className="progress" style={{ animation: `progress ${(categories.length * 2) + 0.2}s linear infinite` }}></div>
      </div>
      <p>Loading... {getLabelForCategory(categories[currentIndex])}</p>
    </div>
  );
};

export default LoadingScreen;
