import React from 'react';
import content from '../data/content.json';
import { buildSrcSet } from '../utils/responsiveImage';
import { noDownloadProps, noDownloadStyle } from '../utils/imageProtection';

const ABOUT_WIDTHS = [480, 800, 1200];

const About = () => {
    return (
        <section id="about" className="section about-section">
            <div className="container">
                <div className="about-card">
                    <div className="about-image-wrap">
                        <img
                            src={content.about.image}
                            srcSet={buildSrcSet(content.about.image, ABOUT_WIDTHS)}
                            sizes="(max-width: 768px) 100vw, 480px"
                            alt="Photographer"
                            loading="lazy"
                            decoding="async"
                            {...noDownloadProps}
                            style={noDownloadStyle}
                        />
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
