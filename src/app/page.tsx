"use client";

import Layout from "./components/Layout";
import PuzzleText from './components/PuzzleAnimation'
import './css/index.css';
import Contact from "./components/Contact";
import SkillsCarousel from "./components/SkillsCarousel";
import SlideShow from "./components/SlideShow";
import ProjectCard from "./components/ProjectCard";
import { useState, useEffect } from "react";
import Link from "next/link";



export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
      fetch('https://sumitake.ca/portfolio-data/wp-json/wp/v2/projects?acf_format=standard')
          .then(response => response.json())
          .then(data => {
              if (Array.isArray(data)) {
                  setProjects(data);
                  console.log(data);
              } else {
                  console.error("Unexpected response format", data);
              }
          })
          .catch(error => console.error("Error fetching data:", error));
  }, []);

  const projectSlides = projects.map((project, index) => (
    <ProjectCard key={project.id} project={project} index={index} />
  ));

  return (
      // <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Layout>
          <main>
            <div className='landing-page'>
              <p>Hello, I&apos;m Takehito Sumimura. A passionate Web Developer.</p>
              <PuzzleText></PuzzleText>
              <Contact></Contact>
              <SkillsCarousel></SkillsCarousel>
              <div className="about-link">
                <Link href="/about" passHref>More about me</Link>              
              </div>
              <SlideShow slides={projectSlides}></SlideShow>
              <div className="projects-link">
                <Link href="/projects" passHref>See all the projects</Link>              
              </div>
            </div>
          </main>
        </Layout>
      // </main>

  );
}
