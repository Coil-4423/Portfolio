// ParallaxBackground.tsx
import React from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';

const ParallaxBackground: React.FC = () => {
  return (
    <ParallaxBanner
      layers={[
        {
          image: '/binary-number-system.webp', // Replace with your image path
          speed: 0.5, // Adjust the speed of the background layer
        },
      ]}
      style={{
        height: '100vh', // Full screen height
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        color: 'white',
        fontSize: '3rem',
        textAlign: 'center',
      }}>
        <h1>Takehito Sumimura</h1>
        <p>Welcome to my portfolio</p>
      </div>
    </ParallaxBanner>
  );
};

export default ParallaxBackground;
