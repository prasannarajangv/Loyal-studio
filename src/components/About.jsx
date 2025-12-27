import React from 'react';
import content from '../data/content.json';

const About = () => {
    return (
        <section id="about" className="section" style={{ background: 'var(--color-light-gray)' }}>
            <div className="container" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '4rem',
                alignItems: 'center'
            }}>
                <div>
                    <img
                        src={content.about.image}
                        alt="Photographer"
                        style={{
                            width: '100%',
                            borderRadius: '2px',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                        }}
                    />
                </div>
                <div>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>{content.about.title}</h2>
                    <p style={{
                        fontSize: '1.1rem',
                        lineHeight: 1.8,
                        color: 'var(--color-dark-gray)',
                        marginBottom: '2rem'
                    }}>
                        {content.about.text}
                    </p>
                    <div style={{
                        fontFamily: 'var(--font-heading)',
                        fontStyle: 'italic',
                        fontSize: '1.25rem'
                    }}>
                        - Loyal Studio
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
