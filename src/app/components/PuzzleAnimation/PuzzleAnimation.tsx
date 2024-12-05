"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './PuzzleAnimation.css'; // Import the CSS file

const PuzzleText: React.FC = () => {
  const reactText: string = "React/Next.js";
  const developerText: string = "Developer";

  const reactLetters = reactText.split('');
  const developerLetters = developerText.split('');

  const [animate, setAnimate] = useState<boolean>(false);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);

  // Calculate random positions for the puzzle effect
  useEffect(() => {
    const newPositions = [...reactLetters, ...developerLetters].map(() => ({
      x: Math.floor(Math.random() * 1000) - 500,
      y: Math.floor(Math.random() * 500) - 250,
    }));
    setPositions(newPositions);

    const timeout = setTimeout(() => setAnimate(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  // Render letters with staggered animation effect
  const renderLetters = (
    letters: string[],
    className: string,
    startDelay: number
  ) =>
    letters.map((letter, index) => {
      const { x, y } = positions[index] || { x: 0, y: 0 };
      return (
        <motion.span
          key={index}
          initial={{ x, y, opacity: 0 }}
          animate={animate ? { x: 0, y: 0, opacity: 1 } : {}}
          transition={{
            delay: startDelay + index * 0.1, // Stagger the animations
            duration: 0.8,
            ease: "easeOut",
          }}
          className={`letter ${className}`}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      );
    });

  return (
    <div className="puzzle-container">
      <p className="puzzle-text react-text">
        {renderLetters(reactLetters, 'default-text', 0)}
      </p>
      <p className="puzzle-text developer-text">
        {renderLetters(developerLetters, 'developer-text', reactLetters.length * 0.1)}
      </p>
    </div>
  );
};

export default PuzzleText;
