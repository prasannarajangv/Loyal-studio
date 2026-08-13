import React from 'react';
import content from '../data/content.json';

const About = () => {
    return (
        <section id="about" className="section about-section">
            <div className="container">
                <div className="about-card">
                    <div className="about-image-wrap">
                        <img src={content.about.image} alt="Photographer" loading="lazy" />
                    </div>
                    <div className="about-copy">
                        <span className="about-badge">About Loyal Studio</span>
                        <h2>{content.about.title}</h2>
                        <p>{content.about.text}</p>
                        <div className="about-highlights">
                            <div>
                                <strong>10+</strong>
                                <span>Years of experience</span>
                            </div>
                            <div>
                                <strong>1000+</strong>
                                <span>Moments captured</span>
                            </div>
                        </div>
                        <div className="about-signature">- Loyal Studio</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
