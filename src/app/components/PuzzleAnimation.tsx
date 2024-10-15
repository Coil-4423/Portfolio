"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../css/PuzzleAnimation.css'; // Import the CSS file

const PuzzleText: React.FC = () => {
  const text: string = "React/Next.js Developer";
  const letters: string[] = text.split('');
  
  const [animate, setAnimate] = useState<boolean>(false);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const newPositions = letters.map(() => ({
      x: Math.floor(Math.random() * 1000) - 500,
      y: Math.floor(Math.random() * 500) - 250,
    }));
    setPositions(newPositions);
    
    const timeout = setTimeout(() => {
      setAnimate(true);
    }, 1000);
    
    return () => clearTimeout(timeout);
  }, []);

  const developerStartIndex: number = text.indexOf("Developer");

  return (
    <div className="puzzle-container">
      <div className="puzzle-text">
        {letters.map((letter, index) => {
          const { x, y } = positions[index] || { x: 0, y: 0 };
          const letterColor: string = index >= developerStartIndex && index < developerStartIndex + "Developer".length
            ? 'developer-text'
            : 'default-text';

          return (
            <motion.span
              key={index}
              initial={{ x, y, opacity: 0 }}
              animate={animate ? { x: 0, y: 0, opacity: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className={`letter ${letterColor}`}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
};

export default PuzzleText;
