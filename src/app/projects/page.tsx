'use client'
// pages/projects.tsx
import React, { useState, useEffect } from 'react';

import Layout from "../components/Layout";
import "@/app/css/index.css";
import "@/app/css/projects.css";
import ProjectCard from '../components/ProjectCard';



// Create a separate component for each ProjectCard
// const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
//     const ref = useRef(null); // Reference to track the visibility of each project card
//     const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' }); // Trigger when card is visible

//     return (
//         <motion.div
//             ref={ref}  // Attach the ref to the card
//             className='project-card'
//             initial={{ opacity: 0, y: 50 }}  // Start hidden and shifted down
//             animate={isInView ? { opacity: 1, y: 0 } : {}}  // Only animate when in view
//             transition={{ duration: 0.5, delay: index * 0.2 }}  // Stagger each card appearance slightly
//         >
//             <div className='project-image'>
//                 {/* Check if the gallery exists and has at least one item */}
//                 {project.acf.gallery && project.acf.gallery.length > 0 ? (
//                     <img
//                         src={project.acf.gallery[0].url}
//                         alt="thumbnailImage"
//                         className='thumbnail-image'
//                     />
//                 ) : (
//                     <div className="placeholder-image" />
//                 )}
//             </div>
//             <article>
//                 <h3>{project.title.rendered}</h3>
//                 <p>{project.acf.description}</p>
//                 {/* Link to the individual project page */}
//                 <Link href={`/projects/${project.id}`}>
//                     More Info
//                 </Link>
//             </article>
//         </motion.div>
//     );
// };

const Projects = () => {
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

    return (
        <Layout>
            <main>
                <div className='projects'>
                    <h1>Projects</h1>
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </main>
        </Layout>
    );
};

export default Projects;
