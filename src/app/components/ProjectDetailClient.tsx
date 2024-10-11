// src/app/projects/[id]/ProjectDetailClient.tsx
'use client'; // Mark this as a client component

import Layout from './Layout';
import '@/app/css/index.css';
import '@/app/css/project-detail.css';
import { useState } from 'react';
import SlideShow from './SlideShow';
import Image from 'next/image';

export default function ProjectDetailClient({ project }: { project: Project }) {
    // State for toggling each section
    const [showOverview, setShowOverview] = useState(true);
    const [showFeatures, setShowFeatures] = useState(false);
    console.log(project.acf.gallery);

    const projectSlides = project.acf.gallery.map((image, index) => (
        <div key={index} className='image-container'>
            <Image
                src={image.url}
                alt={`project image ${index}`}
                layout="fill"        // Fill the container
                objectFit="cover"     // Ensure the image covers the entire container
                quality={100}         // Set high quality for sharp images
            />
        </div>
    ));
    

    return (
        <Layout>
            <main>
                <SlideShow slides={projectSlides}></SlideShow>
                <h1>{project.title.rendered}</h1>
                <div className='links'>
                    {/* GitHub Link */}
                    {project.acf.github_repository_link && (
                        <a href={project.acf.github_repository_link} target="_blank" rel="noopener noreferrer">
                            <strong>GitHub</strong>
                        </a>
                    )}
                
                    {/* Live Site Link */}
                    {project.acf.live_site_link && (
                        <a href={project.acf.live_site_link} target="_blank" rel="noopener noreferrer">
                            <strong>Live Site</strong>
                        </a>
                    )}
                </div>
            <div className='toggle'>
                    <button onClick={() => {
                        setShowOverview(true);
                        setShowFeatures(false);
                        }}>
                        <p>Show Project Overview</p>
                    </button>
                    <button onClick={() => {
                        setShowOverview(false);
                        setShowFeatures(true);
                        }}>
                        <p>Show Features</p>
                    </button>
            </div>
                {/* Toggle Project Overview */}
                <div>
                    {showOverview && <p>{project.acf.project_overview}</p>}
                </div>

                {/* Toggle Features and Functionality */}
                {project.acf.features_functionality && (
                    <div>
                        {showFeatures && (
                            <p><strong>Features:</strong> {project.acf.features_functionality}</p>
                        )}
                    </div>
                )}

            </main>
        </Layout>
    );
}