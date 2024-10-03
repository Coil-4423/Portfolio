// src/app/projects/[id]/ProjectDetailClient.tsx
'use client'; // Mark this as a client component

import { useState, useEffect } from 'react';

interface Project {
    id: number;
    title: {
        rendered: string;
    };
    acf: {
        project_overview?: string;
        features_functionality?: string;
        github_repository_link?: string;
        live_site_link?: string;
    };
}

export default function ProjectDetailClient({ project }: { project: Project }) {
    return (
        <div>
            <h1>{project.title.rendered}</h1>
            <p>{project.acf.project_overview}</p>
            {project.acf.features_functionality && (
                <p><strong>Features:</strong> {project.acf.features_functionality}</p>
            )}
            {project.acf.github_repository_link && (
                <p>
                    <strong>GitHub:</strong>{" "}
                    <a href={project.acf.github_repository_link} target="_blank" rel="noopener noreferrer">
                        {project.acf.github_repository_link}
                    </a>
                </p>
            )}
            {project.acf.live_site_link && (
                <p>
                    <strong>Live Site:</strong>{" "}
                    <a href={project.acf.live_site_link} target="_blank" rel="noopener noreferrer">
                        {project.acf.live_site_link}
                    </a>
                </p>
            )}
        </div>
    );
}
