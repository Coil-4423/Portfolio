// src/app/projects/[id]/page.tsx (server component)

import ProjectDetailClient from '../../components/ProjectDetailClient';

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

async function fetchProject(id: string): Promise<Project | null> {
    const response = await fetch(`https://sumitake.ca/portfolio-data/wp-json/wp/v2/projects/${id}?acf_format=standard`);
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

export async function generateStaticParams() {
    const response = await fetch('https://sumitake.ca/portfolio-data/wp-json/wp/v2/projects?acf_format=standard');
    const projects: Project[] = await response.json();

    return projects.map((project) => ({
        id: project.id.toString(),
    }));
}
