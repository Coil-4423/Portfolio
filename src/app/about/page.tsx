"use client";
import React from "react";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Image from "next/image";
import LoadingComponent from "../components/LoadingComponent";
import '../css/index.css';

import '../css/About.css';


// Define types for API response and ACF fields
interface Tool {
  tool_name: string;
  tool_image: {
    url: string;
    alt: string;
  };
}

interface ACFFields {
  who_i_am: string;
  what_i_do: string;
  future_goals: string;
  tools: Tool[];
}

interface AboutPageData {
  id: number;
  title: {
    rendered: string;
  };
  acf: ACFFields;
}

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
      {loading ? (
        <LoadingComponent/>
      ):(
        <>

        <section>
          <h2>Who I Am</h2>
          <p>{who_i_am}</p>
        </section>

        <section>
          <h2>What I Do</h2>
          <p>{what_i_do}</p>
        </section>

        <section>
          <h2>Future Goals</h2>
          <p>{future_goals}</p>
        </section>

        <section className="tools">
          <h2>Tools</h2>
          <ul>
            {tools &&
              tools.map((tool, index) => (
                <li key={index}>
                  <Image
                    src={tool.tool_image.url}
                    alt={tool.tool_name || "tool"}
                    width={50}
                    height={50}
                  />
                  <span>{tool.tool_name}</span>
                </li>
              ))}
          </ul>
        </section>
        </>
      )}
    </Layout>
  );
};

export default About;
