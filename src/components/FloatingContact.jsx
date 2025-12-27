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
            bottom: '2rem',
            right: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            zIndex: 9999
        }}>
            {contactLinks.map((item, index) => (
                <a
                    key={index}
                    href={item.href}
                    target={item.label === 'WhatsApp' ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    title={item.label}
                    style={{
                        width: '3.5rem',
                        height: '3.5rem',
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
