import React, { useState } from 'react';
import content from '../data/content.json';
import { motion, AnimatePresence } from 'framer-motion';

const Portfolio = ({ portfolioCategory, setPortfolioCategory }) => {
    const [selectedItem, setSelectedItem] = useState(null); // For Lightbox
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

    // Extract unique categories (Removing 'All' as requested)
    const categories = [...new Set(content.portfolio.map(item => item.category))];

    // Filter items (Defaults to first category if none matches, but App.jsx handles default)
    const filteredItems = content.portfolio.filter(item => item.category === portfolioCategory);

    return (
        <section id="portfolio" className="section" style={{ background: 'var(--color-bg)' }}>
            <div className="container">
                <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>Selected Works</h2>

                {/* Filters */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    marginBottom: '3rem'
                }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setPortfolioCategory(cat)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                borderBottom: portfolioCategory === cat ? '2px solid var(--color-text)' : '2px solid transparent',
                                padding: '0.5rem 1rem',
                                cursor: 'pointer',
                                fontFamily: 'var(--font-body)',
                                fontSize: '1rem',
                                color: portfolioCategory === cat ? 'var(--color-text)' : 'var(--color-dark-gray)',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '1.5rem'
                    }}
                >
                    <AnimatePresence>
                        {filteredItems.map(item => (
                            <motion.div
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                key={item.id}
                                style={{ position: 'relative', cursor: 'pointer', overflow: 'hidden', aspectRatio: '3/2' }}
                                className="portfolio-item"
                                onClick={() => openLightbox(item)}
                            >
                                <img
                                    src={Array.isArray(item.src) ? item.src[0] : item.src}
                                    alt={item.title}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.5s ease'
                                    }}
                                />
                                <div className="overlay" style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: 'rgba(0,0,0,0.4)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    opacity: 0,
                                    transition: 'opacity 0.3s ease',
                                    color: 'white'
                                }}>
                                    <h3 style={{ marginBottom: '0.5rem' }}>{item.title}</h3>
                                    <span style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.category}</span>
                                    {Array.isArray(item.src) && item.src.length > 1 && (
                                        <span style={{ marginTop: '0.5rem', fontSize: '0.75rem', background: 'rgba(255,255,255,0.2)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                                            View {item.src.length} Photos
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
            {/* Lightbox */}
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
                            background: 'rgba(0,0,0,0.9)',
                            zIndex: 1000,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
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
                                zIndex: 1001
                            }}
                        >
                            &times;
                        </button>

                        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {/* Navigation Buttons (only if multiple images) */}
                            {Array.isArray(selectedItem.src) && selectedItem.src.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        style={{
                                            position: 'absolute',
                                            left: '2rem',
                                            background: 'rgba(255,255,255,0.1)',
                                            border: 'none',
                                            color: 'white',
                                            padding: '1rem',
                                            cursor: 'pointer',
                                            borderRadius: '50%',
                                            fontSize: '1.5rem',
                                            zIndex: 1001
                                        }}
                                    >
                                        &#8249;
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        style={{
                                            position: 'absolute',
                                            right: '2rem',
                                            background: 'rgba(255,255,255,0.1)',
                                            border: 'none',
                                            color: 'white',
                                            padding: '1rem',
                                            cursor: 'pointer',
                                            borderRadius: '50%',
                                            fontSize: '1.5rem',
                                            zIndex: 1001
                                        }}
                                    >
                                        &#8250;
                                    </button>
                                </>
                            )}

                            <motion.img
                                key={currentImageIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                src={Array.isArray(selectedItem.src) ? selectedItem.src[currentImageIndex] : selectedItem.src}
                                alt={selectedItem.title}
                                style={{
                                    maxWidth: '90%',
                                    maxHeight: '90vh',
                                    objectFit: 'contain'
                                }}
                                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        .portfolio-item:hover img {
          transform: scale(1.05);
        }
        .portfolio-item:hover .overlay {
          opacity: 1;
        }
      `}</style>
        </section>
    );
};

export default Portfolio;
