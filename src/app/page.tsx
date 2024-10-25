"use client";

import Layout from "./components/Layout";
import PuzzleText from "./components/PuzzleAnimation";
import "./css/index.css";
import Contact from "./components/Contact";
import SkillsCarousel from "./components/SkillsCarousel";
import SlideShow from "./components/SlideShow";
import ProjectCard from "./components/ProjectCard";
import { useState, useEffect } from "react";
import { Project } from "./types/ProjectTypes";
import { SectionWithAnimation } from "./components/SectionWithAnimation";
import LinkWithArrow from "./components/LinkeWithArrow";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);

  // Scroll to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch(
      "https://sumitake.ca/portfolio-data/wp-json/wp/v2/projects?acf_format=standard"
    )
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          console.error("Unexpected response format", data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Limit the number of featured projects to 2
  const featuredProjects = projects
    .slice(0, 2)
    .map((project, index) => (
      <ProjectCard key={project.id} project={project} index={index} />
    ));

  return (
    <Layout>
      <main>
        <div className="landing-page">
          <p className="intro-text">
            <span className="name">Takehito Sumimura</span>
          </p>
          <PuzzleText></PuzzleText>
          <Contact></Contact>
          <SectionWithAnimation>
            <h2>Skills</h2>
            <SkillsCarousel></SkillsCarousel>
            <div className="about-link">
              <LinkWithArrow href="/about">More about me</LinkWithArrow>
            </div>
          </SectionWithAnimation>
          <SectionWithAnimation>
            <h2>Featured Works</h2>
            <SlideShow slides={featuredProjects}></SlideShow>
            <div className="projects-link">
              <LinkWithArrow href="/projects">See all projects</LinkWithArrow>
            </div>
          </SectionWithAnimation>
        </div>
      </main>
    </Layout>
  );
}
