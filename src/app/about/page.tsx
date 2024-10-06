"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import LoadingComponent from "../components/LoadingComponent";
import ToolSection from "./ToolSection"; // Import the ToolsSection component
import "../css/index.css";
import "../css/About.css";
import { AboutPageData } from "./types"; // Import the AboutPageData type

const About = () => {
  const [aboutData, setAboutData] = useState<AboutPageData | null>(null); // State to store about page data
  const [loading, setLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    // Fetch data from WordPress REST API for the About page
    fetch("https://sumitake.ca/portfolio-data/wp-json/wp/v2/pages?slug=about")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setAboutData(data[0]); // The first object in the array is your About page data
        }
        setLoading(false); // Set loading state to false
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading state to false in case of an error
      });
  }, []); // This runs when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Display loading message while data is being fetched
  }

  if (!aboutData || !aboutData.acf) {
    return <div>No About data found</div>; // Display message if no data is found
  }

  // Destructure ACF data
  const { who_i_am, what_i_do, future_goals, tools } = aboutData.acf;

  // Define motion variants for animations
  const sectionVariant = {
    hidden: { opacity: 0, y: 50 }, // Start hidden and shifted down
    visible: { opacity: 1, y: 0 }, // Animate to visible and centered
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.3, // Stagger each section's appearance
      },
    },
  };

  return (
    <Layout>
      {loading ? (
        <LoadingComponent />
      ) : (
        <motion.main
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.section
            variants={sectionVariant}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2>Who I Am</h2>
            <p>{who_i_am}</p>
          </motion.section>

          <motion.section
            variants={sectionVariant}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2>What I Do</h2>
            <p>{what_i_do}</p>
          </motion.section>

          <motion.section
            variants={sectionVariant}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2>Future Goals</h2>
            <p>{future_goals}</p>
          </motion.section>

          {/* Replace the tools section with the ToolsSection component */}
          <motion.section
            className="tools"
            variants={sectionVariant}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {/* <h2>Tools</h2> */}
            {/* Pass the tools array to the ToolsSection component */}
            <ToolSection tools={tools} />
          </motion.section>
        </motion.main>
      )}
    </Layout>
  );
};

export default About;
