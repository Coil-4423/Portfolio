// src/app/projects/[id]/page.tsx
import { Project } from '@/app/types/ProjectTypes';
import ProjectDetailClient from '../../components/ProjectDetailClient';

// Fetch project data without caching
async function fetchProject(id: string): Promise<Project | null> {
  const response = await fetch(`https://sumitake.ca/portfolio-data/wp-json/wp/v2/projects/${id}?acf_format=standard`, {
    cache: "no-store",  // Always fetch fresh data
  });
  if (!response.ok) return null;
  return await response.json();
}

// Generate static params with fresh data
export async function generateStaticParams() {
  const response = await fetch('https://sumitake.ca/portfolio-data/wp-json/wp/v2/projects?acf_format=standard', {
    cache: "no-store", // Always fetch fresh data
  });
  const projects: Project[] = await response.json();
  return projects.map((project) => ({
    id: project.id.toString(),
  }));
}

// Main component to render project details
export default async function ProjectDetail({ params }: { params: { id: string } }) {
  const project = await fetchProject(params.id);
  if (!project) return <p>Project not found</p>;
  return <ProjectDetailClient project={project} />;
}