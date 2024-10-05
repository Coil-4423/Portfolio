'use client'
// pages/projects.tsx
import React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';  // Import motion
import Layout from "../components/Layout";
import "@/app/css/index.css";
import "@/app/css/projects.css";

interface Project {
    id: number;
    title: {
        rendered: string;
    };
    acf: {
        project_overview?: string;
        gallery: {
            url: string;
        }[];
    };
}

const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetch('https://sumitake.ca/portfolio-data/wp-json/wp/v2/projects?acf_format=standard')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setProjects(data);
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
                        <motion.div
                            key={project.id}
                            className='project-card'
                            initial={{ opacity: 0, y: 50 }} // Start hidden and shifted down
                            animate={{ opacity: 1, y: 0 }}  // Animate to visible and centered
                            transition={{ delay: index * 0.5 }}  // Stagger each card appearance
                        >
                            <div className='project-image'>
                                {/* Check if the gallery exists and has at least one item */}
                                {project.acf.gallery && project.acf.gallery.length > 0 ? (
                                    <img src={project.acf.gallery[0].url} 
                                    alt="thumbnailImage" 
                                    className='thumbnail-image'
                                    />
                                ) : (
                                    true
                                )}
                            </div>
                            <article>
                                <h3>{project.title.rendered}</h3>
                                <p>{project.acf.project_overview}</p>
                                {/* Link to the individual project page */}
                                <Link href={`/projects/${project.id}`}>
                                    More Info
                                </Link>
                            </article>
                        </motion.div>
                    ))}
                </div>
            </main>
        </Layout>
    );
};

export default Projects;
