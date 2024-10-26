import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "@/app/css/projects.css";
import { Project } from "../types/ProjectTypes";
import '../css/LinkButton.css'
import LinkWithArrow from "./LinkeWithArrow";

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const ref = useRef(null); // Reference to track the visibility of each project card
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" }); // Trigger when card is visible

  return (
    <motion.div
      ref={ref} // Attach the ref to the card
      className="project-card"
      initial={{ opacity: 0, y: 50 }} // Start hidden and shifted down
      animate={isInView ? { opacity: 1, y: 0 } : {}} // Only animate when in view
      transition={{ duration: 0.5, delay: index * 0.2 }} // Stagger each card appearance slightly
    >
      <div className="project-image">
        {/* Check if the gallery exists and has at least one item */}
        {project.acf.gallery && project.acf.gallery.length > 0 ? (
          <img
            src={project.acf.gallery[0].url}
            alt="thumbnailImage"
            className="thumbnail-image"
          />
        ) : (
          <div className="placeholder-image" />
        )}
      </div>
      <article>
        <h3>{project.title.rendered}</h3>
        <p>{project.acf.description}</p>
        {/* Link to the individual project page */}
        <div className="link-button">
          {/* <Link href={`/projects/${project.id}`}>More Info</Link> */}
          <LinkWithArrow href={`/projects/${project.slug}`}>More Info</LinkWithArrow>
        </div>
      </article>
    </motion.div>
  );
};
export default ProjectCard;
