"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image'; // Import Image for logos
import '@/app/css/skillsCarousel.css';
import { AboutPageData } from "../types/AboutTypes"; // Import the AboutPageData type

const SkillsCarousel: React.FC = () => {
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
  const { tools } = aboutData.acf;

  // Duplicate the tools array to create a looping effect
  const duplicatedTools = [...tools, ...tools]; // Concatenates tools with a copy of itself

  return (
    <div className="tools-carousel">
      <div className="tools-track">
        {duplicatedTools.map((tool, index) => (
          <div key={index} className="tool-item">
            <Image
              src={tool.tool_image.url}
              alt={tool.tool_name}
              className='tool-image'
              width={80}
              height={80}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsCarousel;
