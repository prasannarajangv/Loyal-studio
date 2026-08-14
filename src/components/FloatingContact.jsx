import React from 'react';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import content from '../data/content.json';

const FloatingContact = () => {
    // Remove formatting from phone number for links
    const rawPhone = content.meta.phone.replace(/[^0-9+]/g, '');

    const contactLinks = [
        {
            icon: <FaWhatsapp size={28} />,
            href: `https://wa.me/${rawPhone.replace('+', '')}`,
            label: 'WhatsApp',
            color: '#25D366', // WhatsApp Green
        },
        {
            icon: <FaPhoneAlt size={20} />,
            href: `tel:${rawPhone}`,
            label: 'Call',
            color: '#007AFF', // Standard Blue
        }
    ];

    return (
        <div style={{
            position: 'fixed',
            bottom: 'calc(clamp(1rem, 4vw, 2rem) + env(safe-area-inset-bottom))',
            right: 'calc(clamp(1rem, 4vw, 2rem) + env(safe-area-inset-right))',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(0.6rem, 2vw, 1rem)',
            // Below the navbar (1000) and every lightbox/modal (1000-2001) so
            // enlarged photos and menus always appear above these buttons,
            // never the other way around.
            zIndex: 500
        }}>
            {contactLinks.map((item, index) => (
                <a
                    key={index}
                    href={item.href}
                    target={item.label === 'WhatsApp' ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    title={item.label}
                    style={{
                        width: 'clamp(2.75rem, 8vw, 3.5rem)',
                        height: 'clamp(2.75rem, 8vw, 3.5rem)',
                        borderRadius: '50%',
                        background: item.color,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        transition: 'transform 0.3s ease',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    {item.icon}
                </a>
            ))}
        </div>
    );
};

export default FloatingContact;
