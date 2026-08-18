import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Portfolio from '../../components/Portfolio';
import content from '../../data/content.json';
import { useSEO } from '../../hooks/useSEO';

const slug = (s) => encodeURIComponent(s.toLowerCase().replace(/\s+/g, '-'));

const PortfolioCategory = () => {
    const { category } = useParams();

    const categories = [...new Set(content.portfolio.map(item => item.category))];
    const matched = category ? categories.find(c => slug(c) === String(category)) : null;
    const readable = matched || null;

    useSEO({
        title: readable ? `${readable} Portfolio` : 'Portfolio',
        description: readable
            ? `View the ${readable.toLowerCase()} collection by Loyal Studio, a photography studio based in Namakkal, Tamil Nadu.`
            : 'Browse the Loyal Studio photography portfolio.',
        path: `/portfolio/${category || ''}`,
    });

    if (category && !matched) {
        return (
            <section className="section">
                <div className="container">
                    <h2>Category not found</h2>
                    <p>Go back to <Link to="/portfolio">portfolio</Link>.</p>
                </div>
            </section>
        );
    }

    return (
        <section id="portfolio" className="section">
            <div className="container">
                <div className="portfolio-category-head">
                    <h2>{readable || 'Portfolio'}</h2>
                    <p>Browse a curated selection of work from this collection and step into the atmosphere of each session.</p>
                </div>
            </div>
            <Portfolio portfolioCategory={readable} />
        </section>
    );
};

export default PortfolioCategory;
