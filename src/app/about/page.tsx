"use client";
import React, { useEffect, useState} from "react";
import { motion} from "framer-motion";
import Layout from "../components/Layout";
import LoadingComponent from "../components/LoadingComponent";
import ToolsSection from "./ToolsSection"; // Import the ToolsSection component
import "../css/index.css";
import "../css/About.css";
import { AboutPageData } from "../types/AboutTypes"; // Import the AboutPageData type
import { SectionWithAnimation } from "../components/SectionWithAnimation";

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


  return (
    <Layout>
      <div className="about">
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
            {tools && tools.length > 0 && (
              <ToolsSection tools={tools}></ToolsSection>
            )}
          </SectionWithAnimation>
        </motion.main>
      )}
      </div>
    </Layout>
  );
};

export default About;
