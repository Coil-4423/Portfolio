"use client";
import { useEffect, useState } from 'react';
import Layout from "../components/Layout/Layout";
import "@/app/css/index.css";

interface Image {
    url:string;
    alt:string;
    title:string;
}

// Updated PortfolioItem interface based on the data structure you provided
interface PortfolioItem {
    id: number;
    title: {
        rendered: string;
    };
    link: string;
    acf: {
        gallery?: Image[];
        features_functionality?: string;
        github_repository_link?: string;
        live_site_link?: string;
        project_overview?: string;
        reflection?: string;
        tools?: string;
    };
}

const Portfolio: React.FC = () => {
    const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]); // Typed state

    useEffect(() => {
        fetch('https://sumitake.ca/portfolio-data/wp-json/wp/v2/projects?acf_format=standard')
            .then(response => response.json())
            .then(data => {
                // Check if the data is an array and then set it to state
                if (Array.isArray(data)) {
                    setPortfolioItems(data); // Update state with the fetched data
                } else {
                    console.error("Unexpected response format:", data);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []); // This runs when the component mounts
    
    return (
        <Layout>
            <main>
            {portfolioItems.length > 0 ? (
                portfolioItems.map(item => (
                    <div key={item.id}>
                        <h2>{item.title.rendered}</h2>
                        <a href={item.link} target="_blank" rel="noopener noreferrer">View Project</a>
                        {/* Display ACF fields */}
                        {item.acf && (
                            <div>
                                {item.acf.github_repository_link && (
                                    <p>
                                        <strong>GitHub:</strong>{" "}
                                        <a href={item.acf.github_repository_link} target="_blank" rel="noopener noreferrer">
                                            {item.acf.github_repository_link}
                                        </a>
                                    </p>
                                )}
                                {item.acf.live_site_link && (
                                    <p>
                                        <strong>Live Site:</strong>{" "}
                                        <a href={item.acf.live_site_link} target="_blank" rel="noopener noreferrer">
                                            {item.acf.live_site_link}
                                        </a>
                                    </p>
                                )}
                                {item.acf.project_overview && (
                                    <p>
                                        <strong>Overview:</strong> {item.acf.project_overview}
                                    </p>
                                )}
                                {item.acf.features_functionality && (
                                    <p>
                                        <strong>Features:</strong> {item.acf.features_functionality}
                                    </p>
                                )}
                                {item.acf.tools && (
                                    <p>
                                        <strong>Tools:</strong> {item.acf.tools}
                                    </p>
                                )}
                                {/* Display Gallery */}
                                {item.acf.gallery && item.acf.gallery.length > 0 && (
                                    <div className="gallery">
                                        <h3>Gallery</h3>
                                        <div className="gallery-images">
                                            {item.acf.gallery.map((image, index) => (
                                                <div key={index} className="gallery-item">
                                                    <img 
                                                        src={image.url} 
                                                        alt={image.alt || image.title} 
                                                        title={image.title} 
                                                        style={{ maxWidth: '100%', height: 'auto' }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>Loading portfolio items...</p>
            )}
            </main>
        </Layout>
    );
}

export default Portfolio;
