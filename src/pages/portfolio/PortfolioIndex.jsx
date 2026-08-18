import React from 'react';
import content from '../../data/content.json';
import { Link } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';

const slug = (s) => encodeURIComponent(s.toLowerCase().replace(/\s+/g, '-'));

const PortfolioIndex = () => {
    useSEO({
        title: 'Portfolio',
        description: 'Browse the Loyal Studio portfolio: wedding photography, pre-wedding, maternity, baby shoots, events, wedding cinematography, school photography, drone coverage and album designing.',
        path: '/portfolio',
    });

    const categories = [...new Set(content.portfolio.map(item => item.category))];

    return (
        <section className="section">
            <div className="container">
                <div className="portfolio-hero">
                    <span className="about-badge">Selected Portfolio</span>
                    <h2>Explore the stories behind every frame.</h2>
                    <p>Choose a collection to browse a refined selection of weddings, fashion, portraits, and editorial work.</p>
                </div>

                <div className="portfolio-index-grid">
                    {categories.map(cat => (
                        <Link key={cat} to={`/portfolio/${slug(cat)}`} className="portfolio-index-card">
                            <span>{cat}</span>
                            <p>View the {cat.toLowerCase()} collection and discover the mood, light, and detail behind each moment.</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PortfolioIndex;
