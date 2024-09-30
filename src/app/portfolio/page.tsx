"use client";
import { useEffect, useState } from 'react';
import Layout from "../components/Layout";
import "@/app/css/index.css";
import "@/app/css/portfolio.css";


interface PortfolioItem {
    id: number;
    title: {
        rendered: string;
    };
    link: string;
}

const Portfolio: React.FC = () => {
    const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]); // Typed state

    useEffect(() => {
        fetch('https://sumitake.ca/portfolio-data/wp-json/wp/v2/projects')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setPortfolioItems(data); // Update state with the fetched data
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
