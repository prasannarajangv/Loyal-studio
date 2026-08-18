import React from 'react';
import content from '../data/content.json';
import { Mail, Phone, Instagram, Youtube, Facebook } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="section">
            <div className="container">
                <h2 style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 6vw, 4rem)', fontSize: 'clamp(1.6rem, 6vw, 2.5rem)' }}>Get in Touch</h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 'clamp(2rem, 6vw, 4rem)'
                }}>
                    {/* Contact Info */}
                    <div className="contact-info-block">
                        <h3 style={{ fontSize: 'clamp(1.1rem, 4vw, 1.5rem)', marginBottom: 'clamp(1rem, 3vw, 2rem)' }}>Contact Info</h3>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', gap: '1rem' }}>
                            <Mail size={20} />
                            <a href={`mailto:${content.meta.email}`} style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1rem)', wordBreak: 'break-word' }}>{content.meta.email}</a>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
                            <Phone size={20} />
                            <a href={`tel:${content.meta.phone}`} style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1rem)' }}>{content.meta.phone}</a>
                        </div>

                        <h3 style={{ fontSize: 'clamp(1.1rem, 4vw, 1.5rem)', marginBottom: 'clamp(0.75rem, 2vw, 1.5rem)' }}>Follow Me</h3>
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <a href={content.meta.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={24} /></a>
                            <a href={content.meta.facebook} target="_blank" rel="noopener noreferrer"><Facebook size={24} /></a>
                            <a href={content.meta.youtube} target="_blank" rel="noopener noreferrer"><Youtube size={24} /></a>
                        </div>
                    </div>

                    {/* Form */}
                    <form className="contact-form-block" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 3vw, 1.5rem)' }} onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            placeholder="Your Name"
                            style={{
                                padding: 'clamp(0.75rem, 2.5vw, 1rem)',
                                border: '1px solid #444',
                                fontSize: '1rem',
                                outline: 'none',
                                fontFamily: 'inherit',
                                background: '#1a1a1a',
                                color: '#ffffff',
                                width: '100%',
                                boxSizing: 'border-box'
                            }}
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            style={{
                                padding: 'clamp(0.75rem, 2.5vw, 1rem)',
                                border: '1px solid #444',
                                fontSize: '1rem',
                                outline: 'none',
                                fontFamily: 'inherit',
                                background: '#1a1a1a',
                                color: '#ffffff',
                                width: '100%',
                                boxSizing: 'border-box'
                            }}
                        />
                        <textarea
                            rows="5"
                            placeholder="Tell me about your project"
                            style={{
                                padding: 'clamp(0.75rem, 2.5vw, 1rem)',
                                border: '1px solid #444',
                                fontSize: '1rem',
                                outline: 'none',
                                resize: 'vertical',
                                fontFamily: 'inherit',
                                background: '#1a1a1a',
                                color: '#ffffff',
                                width: '100%',
                                boxSizing: 'border-box'
                            }}
                        />
                        <button type="submit" className="btn" style={{ width: 'fit-content' }}>
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
