import React from 'react';
import { useParams, Link } from 'react-router-dom';
import content from '../../data/content.json';
import { buildSrcSet } from '../../utils/responsiveImage';
import { noDownloadProps, noDownloadStyle } from '../../utils/imageProtection';

const DETAIL_WIDTHS = [480, 800, 1200, 1920];

const PortfolioItem = () => {
    const { id, category } = useParams();
    const item = content.portfolio.find(it => String(it.id) === String(id));

    if (!item) {
        return (
            <section className="section">
                <div className="container">
                    <h2>Item not found</h2>
                    <p>Return to <Link to="/portfolio">portfolio</Link>.</p>
                </div>
            </section>
        );
    }

    const images = Array.isArray(item.src) ? item.src : [item.src];

    return (
        <section className="section">
            <div className="container">
                <h2 style={{ marginBottom: '1rem' }}>{item.title}</h2>
                <p style={{ marginBottom: '1rem', textTransform: 'uppercase' }}>{item.category}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                    {images.map((src, idx) => (
                        <img
                            key={idx}
                            src={src}
                            srcSet={buildSrcSet(src, DETAIL_WIDTHS)}
                            sizes="(max-width: 600px) 100vw, 300px"
                            alt={`${item.title} ${idx+1}`}
                            loading="lazy"
                            decoding="async"
                            {...noDownloadProps}
                            style={{ width: '100%', height: 'auto', objectFit: 'cover', ...noDownloadStyle }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PortfolioItem;
