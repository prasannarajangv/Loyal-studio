import React from 'react';
import Contact from '../components/Contact';
import { useSEO } from '../hooks/useSEO';

const ContactPage = () => {
    useSEO({
        title: 'Contact Us',
        description: 'Get in touch with Loyal Studio in Namakkal, Tamil Nadu to book your wedding, pre-wedding, maternity, baby shoot or event photography session.',
        path: '/contact',
    });

    return (
        <main>
            <Contact />
        </main>
    );
};

export default ContactPage;
