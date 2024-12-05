import React from 'react';
import './LoadingComponent.css'; // Optional, if you want to style it

const LoadingComponent = () => {
  return (
    <div className="loading-container">
      {/* Customize this loading animation or spinner */}
      <div className="spinner"></div>
      <p>Loading, please wait...</p>
    </div>
  );
};

export default LoadingComponent;
