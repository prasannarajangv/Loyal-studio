import React from 'react';
import About from '../components/About';
import { useSEO } from '../hooks/useSEO';

const AboutPage = () => {
    useSEO({
        title: 'About the Artist',
        description: 'Meet the visual artist and photographer behind Loyal Studio, based in Namakkal, Tamil Nadu, with a passion for storytelling through weddings, commercial projects and branding design.',
        path: '/about',
    });

    return (
        <main>
            <About />
        </main>
    );
};

export default AboutPage;
