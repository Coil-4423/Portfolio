'use client'
// pages/projects.tsx
import React, { useState, useEffect } from 'react';
import Layout from "../components/Layout";
import "@/app/css/index.css";
import "@/app/css/projects.css";
import ProjectCard from '../components/ProjectCard';

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
