'use client';
import React, { useState, useRef } from 'react';
import '../css/randomBackground.css';

const RandomBackground = ({ children }: { children: React.ReactNode }) => {
  const [randomChars, setRandomChars] = useState('');
  const animationFrameId = useRef<number | null>(null);
  const stopTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const generateRandomChars = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const length = 1000; // Number of characters you want in the background
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const updateRandomChars = () => {
    setRandomChars(generateRandomChars());
    animationFrameId.current = requestAnimationFrame(updateRandomChars); // Continuously update with animation frames
  };

  const startUpdating = () => {
    // Clear any previous timeout (if the mouse started moving again)
    if (stopTimeoutRef.current) {
      clearTimeout(stopTimeoutRef.current);
      stopTimeoutRef.current = null;
    }

    if (!animationFrameId.current) {
      animationFrameId.current = requestAnimationFrame(updateRandomChars); // Start updating
    }
  };

  const stopUpdating = () => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current); // Stop updating
      animationFrameId.current = null;
    }
  };

  const handleMouseMove = () => {
    startUpdating();

    // Stop updating characters after 300ms of inactivity
    if (stopTimeoutRef.current) {
      clearTimeout(stopTimeoutRef.current);
    }

    stopTimeoutRef.current = setTimeout(() => {
      stopUpdating();
    }, 1); // Adjust this time as needed
  };

  const handleScroll = () => {
    startUpdating();

    // Stop updating characters after scrolling stops for 300ms
    if (stopTimeoutRef.current) {
      clearTimeout(stopTimeoutRef.current);
    }

    stopTimeoutRef.current = setTimeout(() => {
      stopUpdating();
    }, 1); // Adjust this time as needed
  };

  return (
    <div
      className="random-background"
      onMouseMove={handleMouseMove}
      onScroll={handleScroll}
    >
      <div className="overlay-text">
        {/* {randomChars.split('').map((char, index) => (
          <p key={index} className="random-char">
            {char}
          </p>
        ))} */}
        <p>{randomChars}</p>
      </div>
    </div>
  );
};

export default RandomBackground;
