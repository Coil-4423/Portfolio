// src/app/projects/[id]/page.tsx (server component)

import { Project } from '@/app/types/ProjectTypes';
import ProjectDetailClient from '../../components/ProjectDetailClient';

// Fetch project data without caching (ensures fresh data every time)
async function fetchProject(id: string): Promise<Project | null> {
    const response = await fetch(`https://sumitake.ca/portfolio-data/wp-json/wp/v2/projects/${id}?acf_format=standard`, {
        cache: "no-store"  // Ensure no caching is used
    });
    if (!response.ok) return null;
    const project = await response.json();
    return project;
}

export default async function ProjectDetail({ params }: { params: { id: string } }) {
    const project = await fetchProject(params.id);
    if (!project) return <p>Project not found</p>;

    return (
        <ProjectDetailClient project={project} /> // Client component to handle client-side behavior
    );
}

// Still allow static params generation
export async function generateStaticParams() {
    const response = await fetch('https://sumitake.ca/portfolio-data/wp-json/wp/v2/projects?acf_format=standard', {
        cache: "no-store"  // Ensure no caching is used
    });
    const projects: Project[] = await response.json();

    return projects.map((project) => ({
        id: project.id.toString(),
    }));
}
