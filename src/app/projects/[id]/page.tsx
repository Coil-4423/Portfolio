// src/app/projects/[id]/page.tsx

import { Project } from '@/app/types/ProjectTypes';
import ProjectDetailClient from '../../components/ProjectDetailClient';

// Fetch project data with force-cache and optional revalidation
async function fetchProject(id: string): Promise<Project | null> {
  const response = await fetch(`https://sumitake.ca/portfolio-data/wp-json/wp/v2/projects/${id}?acf_format=standard`, {
    cache: "force-cache",  
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });

  if (!response.ok) return null;
  return await response.json();
}

export async function generateStaticParams() {
  const response = await fetch('https://sumitake.ca/portfolio-data/wp-json/wp/v2/projects?acf_format=standard', {
    cache: "force-cache",
  });
  const projects: Project[] = await response.json();

  return projects.map((project) => ({
    id: project.id.toString(),
  }));
}

export default async function ProjectDetail({ params }: { params: { id: string } }) {
  const project = await fetchProject(params.id);
  if (!project) return <p>Project not found</p>;

  return <ProjectDetailClient project={project} />;
}

export const revalidate = 60; // ISR: Revalidate every 60 seconds
