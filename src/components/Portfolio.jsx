import React, { useState } from 'react';
import content from '../data/content.json';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { buildSrcSet } from '../utils/responsiveImage';
import { noDownloadProps, noDownloadStyle } from '../utils/imageProtection';

const THUMB_WIDTHS = [480, 800, 1200];
const LIGHTBOX_WIDTHS = [800, 1200, 1920, 2400];

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

    // Extract unique categories
    const categories = [...new Set(content.portfolio.map(item => item.category))];

    // Helper to slugify category for URLs
    const slug = (s) => encodeURIComponent(s.toLowerCase().replace(/\s+/g, '-'));
    const navigate = useNavigate();

    // If `portfolioCategory` prop provided, filter by it; otherwise show all
    const filteredItems = portfolioCategory ? content.portfolio.filter(item => item.category === portfolioCategory) : content.portfolio;

    return (
        <section id="portfolio" className="section" style={{ background: 'var(--color-bg)' }}>
            <div className="container">
                {/* "Our Works" heading + full category filter bar only make sense on
                    the unfiltered "all categories" view. On a single-category page
                    (PortfolioCategory already shows its own heading/description),
                    repeating every category here as buttons is redundant and reads
                    as if picking a category just leads to another all-categories page. */}
                {!portfolioCategory && (
                    <>
                        <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>Our Works</h2>

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
                                    onClick={() => {
                                        if (typeof setPortfolioCategory === 'function') {
                                            setPortfolioCategory(cat);
                                        } else {
                                            navigate(`/portfolio/${slug(cat)}`);
                                        }
                                    }}
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
                    </>
                )}

                {/* Always a plain vertical-flowing grid (no horizontal scroller) —
                    photos stack in rows top-to-bottom, same layout whether
                    viewing all categories or one filtered category. */}
                <motion.div
                    layout
                    className="portfolio-grid"
                >
                    <AnimatePresence>
                        {filteredItems.map((item, index) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: (index % 6) * 0.06 }}
                                key={item.id}
                                style={{ position: 'relative', cursor: 'pointer', overflow: 'hidden', aspectRatio: '3/2' }}
                                className="portfolio-item"
                                onClick={() => openLightbox(item)}
                            >
                                <img
                                    src={Array.isArray(item.src) ? item.src[0] : item.src}
                                    srcSet={buildSrcSet(Array.isArray(item.src) ? item.src[0] : item.src, THUMB_WIDTHS)}
                                    sizes="(max-width: 600px) 50vw, 300px"
                                    alt={item.title}
                                    loading="lazy"
                                    decoding="async"
                                    {...noDownloadProps}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.5s ease',
                                        ...noDownloadStyle
                                    }}
                                />
                                <div className="overlay" style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: 'rgba(0,0,0,0.4)',
                                    opacity: 0,
                                    transition: 'opacity 0.3s ease'
                                }} />
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
                                srcSet={buildSrcSet(Array.isArray(selectedItem.src) ? selectedItem.src[currentImageIndex] : selectedItem.src, LIGHTBOX_WIDTHS)}
                                sizes="90vw"
                                alt={selectedItem.title}
                                decoding="async"
                                {...noDownloadProps}
                                style={{
                                    maxWidth: '90%',
                                    maxHeight: '90vh',
                                    objectFit: 'contain',
                                    ...noDownloadStyle
                                }}
                                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Portfolio;
