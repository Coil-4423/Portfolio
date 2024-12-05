// src/app/projects/[id]/ProjectDetailClient.tsx
"use client"; // Mark this as a client component

import Layout from "../Layout/Layout";
import "@/css/index.css";
import "./ProjectDetail.css";
import SlideShow from "../SlideShow/SlideShow";
import Image from "next/image";
import { Project } from "@/types/ProjectTypes";
import ToolsSection from "@/about/ToolsSection";
import "@/css/LinkButton.css";
import { SectionWithAnimation } from "../SectionWithAnimation/SectionWithAnimation";

export default function ProjectDetailClient({ project }: { project: Project }) {

  // Conditionally check if the gallery exists before mapping over it
  const projectSlides =
    project.acf.gallery && project.acf.gallery.length > 0
      ? project.acf.gallery.map((image, index) => (
          <div key={index} className="image-container">
            <Image
              src={image.url}
              alt={`project image ${index}`}
              fill
              style={{ objectFit: 'cover' }}
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
          <SectionWithAnimation>
            <div className="links">
              {/* GitHub Link */}
              {project.acf.github_repository_link && (
                <div className="link-button">
                  <a
                    href={project.acf.github_repository_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-with-arrow"
                  >
                    <strong>GitHub</strong>
                  </a>
                </div>
              )}

              {/* Live Site Link */}
              {project.acf.live_site_link && (
                <div className="link-button">
                  <a
                    href={project.acf.live_site_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-with-arrow"
                  >
                    <strong>Live Site</strong>
                  </a>
                </div>
              )}
            </div>
          </SectionWithAnimation>
          <SectionWithAnimation>
            {project.acf.tools && project.acf.tools.length > 0 && (
              <ToolsSection tools={project.acf.tools}></ToolsSection>
            )}
          </SectionWithAnimation>
          <SectionWithAnimation>
            <div className="overview">
              <h2>Overview</h2>
              <p>{project.acf.project_overview}</p>
            </div>
          </SectionWithAnimation>
          <SectionWithAnimation>
            <div className="features">
              <h2>Features & Functionality</h2>
              <p>{project.acf.features_functionality}</p>
            </div>
          </SectionWithAnimation>
        </div>
      </main>
    </Layout>
  );
}
