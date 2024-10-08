import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectCardProps {
    id: number;
    title: string;
    overview?: string;
    thumbnailUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ id, title, overview, thumbnailUrl }) => {
    return (
        <div className="project-card group border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105">
            <div className="project-image overflow-hidden">
                <Image
                    src={thumbnailUrl}
                    alt="Project Thumbnail"
                    className="w-full h-48 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
            </div>
            <article className="p-4">
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 mb-4">{overview}</p>
                <Link href={`/projects/${id}`}>
                    <a className="text-blue-500 group-hover:text-blue-700 transition-colors duration-300">
                        More Info
                    </a>
                </Link>
            </article>
        </div>
    );
};

export default ProjectCard;
