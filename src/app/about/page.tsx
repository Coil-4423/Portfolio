"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
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

  // Generalized Section Component with In-View Animation
  const SectionWithAnimation = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

    return (
      <motion.section
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={sectionVariant}
        transition={{ duration: 0.5 }}
        style={{ overflow: "hidden" }} // Prevent any overflow that could cause unnecessary space
      >
        {children}
      </motion.section>
    );
  };

  return (
    <Layout>
      {loading ? (
        <LoadingComponent />
      ) : (
        <motion.main initial="hidden" animate="visible">
          <SectionWithAnimation>
            <h2>Who I Am</h2>
            <p>{who_i_am}</p>
          </SectionWithAnimation>

          <SectionWithAnimation>
            <h2>What I Do</h2>
            <p>{what_i_do}</p>
          </SectionWithAnimation>

          <SectionWithAnimation>
            <h2>Future Goals</h2>
            <p>{future_goals}</p>
          </SectionWithAnimation>

          {/* ToolSection with animation trigger */}
          <SectionWithAnimation>
            <ToolSection tools={tools} />
          </SectionWithAnimation>
        </motion.main>
      )}
    </Layout>
  );
};

export default About;
