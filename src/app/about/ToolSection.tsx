import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Tool } from './types';
import React, { useRef } from 'react';

interface ToolsSectionProps {
  tools: Tool[];
}

// Define animation variants for each tool with puzzle effect
const toolVariant = {
  hidden: { opacity: 0, x: 300, scale: 0.8 },  // Start off-screen to the right
  visible: { opacity: 1, x: 0, scale: 1 },    // Animate to visible, centered, and normal size
  hover: { scale: 1.1, rotate: 3 },           // Slight scale up and rotate on hover
};

const ToolsSection: React.FC<ToolsSectionProps> = ({ tools }) => {
  const ref = useRef(null); // Create a ref for the section
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' }); // Track when the section is in view

  return (
    <motion.section
      className="tools"
      ref={ref} // Attach the ref to the section
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'} // Start animation when in view
      style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
    >
      <h2>Tools</h2>
      <motion.ul className="tools-list" style={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none' }}>
        {tools.map((tool, index) => (
          <motion.li
            key={index}
            className="tool-item"
            // variants={toolVariant} // Use puzzle effect variants
            initial="hidden" // Start with hidden state
            animate={isInView ? "visible" : "hidden"} // Animate only when in view
            // whileHover="hover" // Hover effect for each tool
            transition={{ delay: index * 0.2, duration: 0.8 }}  // Staggered delay for puzzle effect
            style={{ display: 'inline-block'}}
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