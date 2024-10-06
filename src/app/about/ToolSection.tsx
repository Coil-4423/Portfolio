import { motion } from 'framer-motion';
import Image from 'next/image';
import { Tool } from './types';
import React, { useState, useEffect } from 'react';

interface ToolsSectionProps {
  tools: Tool[];
}

const ToolsSection: React.FC<ToolsSectionProps> = ({ tools }) => {
  const [animate, setAnimate] = useState(false); // State to trigger the animation

  // Start the puzzle animation after 1 second
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimate(true);
    }, 1000); // Delay the animation start by 1 second

    return () => clearTimeout(timeout); // Cleanup on unmount
  }, []);

  return (
    <motion.section
      className="tools"
      style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
    >
      <h2>Tools</h2>
      <motion.ul className="tools-list" style={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none' }}>
        {tools.map((tool, index) => (
          <motion.li
            key={index}
            className="tool-item"
            initial={{ x: 300, opacity: 0 }}  // Start off-screen to the right (x = 300)
            animate={animate ? { x: 0, opacity: 1 } : {}} // Animate to final position (x = 0)
            transition={{ delay: index * 0.2, duration: 0.8 }}  // Stagger the appearance with delay
            style={{ display: 'inline-block' }}
          >
            <Image
              src={tool.tool_image.url}
              alt={tool.tool_name}
              width={50}
              height={50}
            />
            <span>{tool.tool_name}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  );
};

export default ToolsSection;
