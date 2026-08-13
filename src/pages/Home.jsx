import React, { useState } from 'react';
import Hero from '../components/Hero';
import Portfolio from '../components/Portfolio';
import About from '../components/About';
import content from '../data/content.json';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const openLightbox = (item) => {
        setSelectedItem(item);
        setCurrentImageIndex(0);
    };

    const closeLightbox = () => {
        setSelectedItem(null);
        setCurrentImageIndex(0);
    };

    const nextImage = (e) => {
        e.stopPropagation();
        if (selectedItem) {
            const images = Array.isArray(selectedItem.src) ? selectedItem.src : [selectedItem.src];
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }
    };

    const prevImage = (e) => {
        e.stopPropagation();
        if (selectedItem) {
            const images = Array.isArray(selectedItem.src) ? selectedItem.src : [selectedItem.src];
            setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
        }
    };

    return (
        <main>
            <Hero />
            
            {/* Portfolio Section */}
            <section id="portfolio" className="section" style={{ background: '#000000', padding: '5rem 0' }}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem', fontFamily: 'var(--font-heading)' }}>Our Works</h2>

                    {/* Portfolio Grid */}
                    <motion.div
                        layout
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: '1.5rem'
                        }}
                    >
                        <AnimatePresence>
                            {content.portfolio.map(item => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    key={item.id}
                                    style={{ position: 'relative', cursor: 'pointer', overflow: 'hidden', aspectRatio: '3/2' }}
                                    className="portfolio-item"
                                    onClick={() => openLightbox(item)}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <img
                                        src={Array.isArray(item.src) ? item.src[0] : item.src}
                                        alt={item.title}
                                        loading="lazy"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.5s ease'
                                        }}
                                    />
                                    <div className="portfolio-overlay" style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        background: 'rgba(0, 0, 0, 0.6)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                        padding: '2rem',
                                        opacity: 0,
                                        transition: 'opacity 0.3s ease'
                                    }}>
                                        <h3 style={{ color: 'white', margin: 0, marginBottom: '0.5rem' }}>{item.title}</h3>
                                        <div style={{ textTransform: 'uppercase', fontSize: '0.8rem', color: 'var(--color-accent)' }}>{item.category}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <About />

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLightbox}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(0, 0, 0, 0.95)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 2000,
                            padding: '2rem'
                        }}
                    >
                        <button
                            onClick={closeLightbox}
                            style={{
                                position: 'absolute',
                                top: '2rem',
                                right: '2rem',
                                background: 'transparent',
                                border: 'none',
                                color: 'white',
                                fontSize: '2rem',
                                cursor: 'pointer',
                                zIndex: 2001
                            }}
                        >
                            ✕
                        </button>

                        <div style={{
                            position: 'relative',
                            maxWidth: '90vw',
                            maxHeight: '90vh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <img
                                src={Array.isArray(selectedItem.src) ? selectedItem.src[currentImageIndex] : selectedItem.src}
                                alt={selectedItem.title}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'contain'
                                }}
                            />

                            {/* Navigation Buttons for Multiple Images */}
                            {Array.isArray(selectedItem.src) && selectedItem.src.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        style={{
                                            position: 'absolute',
                                            left: '1rem',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: 'rgba(255, 255, 255, 0.2)',
                                            border: 'none',
                                            color: 'white',
                                            fontSize: '2rem',
                                            padding: '0.5rem 1rem',
                                            cursor: 'pointer',
                                            zIndex: 2001
                                        }}
                                    >
                                        ‹
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        style={{
                                            position: 'absolute',
                                            right: '1rem',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: 'rgba(255, 255, 255, 0.2)',
                                            border: 'none',
                                            color: 'white',
                                            fontSize: '2rem',
                                            padding: '0.5rem 1rem',
                                            cursor: 'pointer',
                                            zIndex: 2001
                                        }}
                                    >
                                        ›
                                    </button>
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '1rem',
                                        color: 'white',
                                        fontSize: '0.9rem',
                                        background: 'rgba(0, 0, 0, 0.5)',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '4px'
                                    }}>
                                        {currentImageIndex + 1} / {selectedItem.src.length}
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
};

export default Home;
