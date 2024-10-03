'use client'
// pages/projects.tsx
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Project {
    id: number;
    title: {
        rendered: string;
    };
    acf: {
        project_overview?: string;
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
        <div>
            <h1>Projects</h1>
            {projects.map(project => (
                <div key={project.id}>
                    <h2>{project.title.rendered}</h2>
                    <p>{project.acf.project_overview}</p>
                    {/* Link to the individual project page */}
                    <Link href={`/projects/${project.id}`}>
                        More Info
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Projects;
