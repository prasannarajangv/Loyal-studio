import React from 'react';
import content from '../data/content.json';

const Footer = () => {
    return (
        <footer style={{
            background: 'var(--color-dark-gray)',
            color: 'white',
            padding: '3rem 0',
            textAlign: 'center'
        }}>
            <div className="container">
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1rem' }}>{content.meta.title}</h3>
                <p style={{ opacity: 0.7, marginBottom: '2rem' }}>{content.meta.description}</p>
                <div style={{ fontSize: '0.875rem', opacity: 0.5 }}>
                    &copy; {new Date().getFullYear()} Loyal Studio. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
