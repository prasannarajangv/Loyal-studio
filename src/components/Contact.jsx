import React from 'react';
import content from '../data/content.json';
import { Mail, Phone, Instagram, Youtube, Facebook } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="section">
            <div className="container">
                <h2 style={{ textAlign: 'center', marginBottom: '4rem', fontSize: '2.5rem' }}>Get in Touch</h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '4rem'
                }}>
                    {/* Contact Info */}
                    <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Contact Info</h3>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', gap: '1rem' }}>
                            <Mail size={20} />
                            <a href={`mailto:${content.meta.email}`}>{content.meta.email}</a>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
                            <Phone size={20} />
                            <a href={`tel:${content.meta.phone}`}>{content.meta.phone}</a>
                        </div>

                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Follow Me</h3>
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <a href={content.meta.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={24} /></a>
                            <a href={content.meta.facebook} target="_blank" rel="noopener noreferrer"><Facebook size={24} /></a>
                            <a href={content.meta.youtube} target="_blank" rel="noopener noreferrer"><Youtube size={24} /></a>
                        </div>
                    </div>

                    {/* Form */}
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            placeholder="Your Name"
                            style={{
                                padding: '1rem',
                                border: '1px solid #ddd',
                                fontSize: '1rem',
                                outline: 'none',
                                fontFamily: 'inherit'
                            }}
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            style={{
                                padding: '1rem',
                                border: '1px solid #ddd',
                                fontSize: '1rem',
                                outline: 'none',
                                fontFamily: 'inherit'
                            }}
                        />
                        <textarea
                            rows="5"
                            placeholder="Tell me about your project"
                            style={{
                                padding: '1rem',
                                border: '1px solid #ddd',
                                fontSize: '1rem',
                                outline: 'none',
                                resize: 'vertical',
                                fontFamily: 'inherit'
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
