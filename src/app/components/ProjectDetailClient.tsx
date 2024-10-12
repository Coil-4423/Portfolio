// src/app/projects/[id]/ProjectDetailClient.tsx
"use client"; // Mark this as a client component

import Layout from "./Layout";
import "@/app/css/index.css";
import "@/app/css/project-detail.css";
import { useState } from "react";
import SlideShow from "./SlideShow";
import Image from "next/image";
import { Project } from "../types/ProjectTypes";
import ToolsSection from "../about/ToolsSection";

export default function ProjectDetailClient({ project }: { project: Project }) {
  // State for toggling each section
  const [showOverview, setShowOverview] = useState(true);
  const [showFeatures, setShowFeatures] = useState(false);
  console.log(project.acf)
  console.log([project.acf.tools]);
  console.log(typeof(project.acf.tools))

  // Conditionally check if the gallery exists before mapping over it
  const projectSlides =
    project.acf.gallery && project.acf.gallery.length > 0
      ? project.acf.gallery.map((image, index) => (
          <div key={index} className="image-container">
            <Image
              src={image.url}
              alt={`project image ${index}`}
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          </div>
        ))
      : [];

  return (
    <Layout>
      <main>
        <div className="single-project">
          <h1>{project.title.rendered}</h1>
          <SlideShow slides={projectSlides}></SlideShow>
          <div className="links">
            {/* GitHub Link */}
            {project.acf.github_repository_link && (
              <a
                href={project.acf.github_repository_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>GitHub</strong>
              </a>
            )}

            {/* Live Site Link */}
            {project.acf.live_site_link && (
              <a
                href={project.acf.live_site_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>Live Site</strong>
              </a>
            )}
          </div>
          <div>
            {project.acf.tools && project.acf.tools.length > 0 && (
              <ToolsSection tools={project.acf.tools}></ToolsSection>
            )}
          </div>
          <div className="toggle">
            <button
              onClick={() => {
                setShowOverview(true);
                setShowFeatures(false);
              }}
            >
              <p>Show Project Overview</p>
            </button>
            <button
              onClick={() => {
                setShowOverview(false);
                setShowFeatures(true);
              }}
            >
              <p>Show Features</p>
            </button>
          </div>
          {/* Toggle Project Overview */}
          <div>{showOverview && <p>{project.acf.project_overview}</p>}</div>

          {/* Toggle Features and Functionality */}
          {project.acf.features_functionality && (
            <div>
              {showFeatures && (
                <p>
                  <strong>Features:</strong>{" "}
                  {project.acf.features_functionality}
                </p>
              )}
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}
