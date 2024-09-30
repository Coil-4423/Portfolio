import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../css/HamburgerMenu.css';

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="menu-container">
            <motion.div 
                className="hamburger"
                onClick={toggleMenu}
                initial={false}
                animate={isOpen ? 'open' : 'closed'}
                variants={{
                    open: { rotate: 45, transition: { duration: 0.3 } },
                    closed: { rotate: 0, transition: { duration: 0.3 } }
                }}
            >
                <motion.span className="bar"></motion.span>
                <motion.span className="bar"></motion.span>
                <motion.span className="bar"></motion.span>
            </motion.div>
        </div>
    );
};

export default HamburgerMenu;
