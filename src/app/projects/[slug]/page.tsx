// src/app/projects/[id]/page.tsx

import { Project } from '@/app/types/ProjectTypes';
import ProjectDetailClient from '../../components/ProjectDetailClient';

// Fetch project data with force-cache and optional revalidation
async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  const response = await fetch(
    `https://sumitake.ca/portfolio-data/wp-json/wp/v2/projects?slug=${slug}&acf_format=standard`,
    { cache: "force-cache" }
  );

  const projects = await response.json();
  return projects.length > 0 ? projects[0] : null; // Return the first matching project
}


export async function generateStaticParams() {
  const response = await fetch(
    'https://sumitake.ca/portfolio-data/wp-json/wp/v2/projects?acf_format=standard',
    { cache: "force-cache" }
  );
  
  const projects: Project[] = await response.json();

  // Map the projects to return slugs instead of IDs
  return projects.map((project) => ({
    slug: project.slug,  // Use the slug from the project data
  }));
}


export default async function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = await fetchProjectBySlug(params.slug);

  if (!project) return <p>Project not found</p>;

  return <ProjectDetailClient project={project} />;
}

