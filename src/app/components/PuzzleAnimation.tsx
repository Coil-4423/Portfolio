"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PuzzleText = () => {
  const text = "React/Next.js Developer";
  
  // Split text into an array of letters, including spaces
  const letters = text.split('');

  // State to trigger the animation
  const [animate, setAnimate] = useState(false);

  // Random positions for each letter (initial random positions)
  const getRandomPosition = () => {
    const randomX = Math.floor(Math.random() * 1000) - 500; // Random X position
    const randomY = Math.floor(Math.random() * 500) - 250;  // Random Y position
    return { x: randomX, y: randomY };
  };

  // Set the animate state after 1 second to start the puzzle animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimate(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  // Find the start index for "Developer" in the text
  const developerStartIndex = text.indexOf("Developer");

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', // Prevent overflow from the random positions
        width: '100%', // Optional: Ensures the parent container takes full width
      }}
    >
      <div style={{ fontSize: '4rem', fontWeight: 'bold', position: 'relative' }}>
        {letters.map((letter, index) => {
          const { x, y } = getRandomPosition();

          // If the current letter is part of "Developer", apply the green color (#00ff11)
          const letterColor = index >= developerStartIndex && index < developerStartIndex + "Developer".length
            ? '#00ff11' // Green for "Developer"
            : 'white';  // Default color for other text

          return (
            <motion.span
              key={index}
              initial={{ x, y, opacity: 0 }}  // Initial random position
              animate={animate ? { x: 0, y: 0, opacity: 1 } : {}} // Final position (0, 0) once animated
              transition={{ delay: index * 0.1, duration: 0.8 }}  // Delay and duration for each letter
              style={{ 
                display: 'inline-block', 
                color: letterColor,
                marginRight: letter === ' ' ? '0.5rem' : '0rem', // Add spacing for spaces
              }}
            >
              {letter === ' ' ? '\u00A0' : letter} {/* Add non-breaking space for spaces */}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
};

export default PuzzleText;
