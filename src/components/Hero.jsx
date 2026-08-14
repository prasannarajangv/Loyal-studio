import React, { useState, useEffect, useRef } from 'react';
import content from '../data/content.json';
import { motion, AnimatePresence } from 'framer-motion';
import { buildSrcSet } from '../utils/responsiveImage';

const HERO_WIDTHS = [800, 1200, 1920];

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    // Parallax is applied to this plain wrapper (not the framer-motion slide
    // below) so direct DOM mutation never fights framer-motion's own
    // ownership of `transform` on the animated slide.
    const parallaxRef = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % content.hero.images.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    // Drive the parallax transform straight on the DOM node via rAF, bypassing
    // React state/re-render on every scroll pixel (was causing scroll jank).
    useEffect(() => {
        let ticking = false;

        const applyParallax = () => {
            ticking = false;
            const node = parallaxRef.current;
            if (!node) return;
            const isMobile = window.innerWidth < 768;
            const offset = window.scrollY * (isMobile ? 0.3 : 0.5);
            node.style.transform = `translateY(${offset}px)`;
        };

        const handleScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(applyParallax);
            }
        };

        applyParallax(); // set initial offset (e.g. navigating in mid-scroll)
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="home" style={{
            height: '100vh',
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            color: 'white',
            marginTop: 0,
            paddingTop: 0
        }}>
            {/* Background Image Slider */}
            <div ref={parallaxRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, willChange: 'transform' }}>
                <AnimatePresence initial={false}>
                    <motion.img
                        key={currentIndex}
                        src={content.hero.images[currentIndex]}
                        srcSet={buildSrcSet(content.hero.images[currentIndex], HERO_WIDTHS)}
                        sizes="100vw"
                        alt=""
                        loading={currentIndex === 0 ? 'eager' : 'lazy'}
                        fetchPriority={currentIndex === 0 ? 'high' : 'auto'}
                        decoding={currentIndex === 0 ? 'sync' : 'async'}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            filter: 'brightness(0.35)'
                        }}
                    />
                </AnimatePresence>
            </div>

            {/* Overlay to improve text contrast during image transitions */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.15) 100%)',
                zIndex: 0
            }} />

            {/* Content */}
            <div className="container" style={{
                position: 'relative',
                textAlign: 'center',
                zIndex: 1,
                paddingBottom: '3rem',
                opacity: 1
            }}>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        fontSize: 'clamp(0.8rem, 4vw, 2.4rem)', // Reduced by approx 10px
                        marginBottom: '0.5rem',
                        lineHeight: 1.1,
                        textTransform: 'uppercase',
                        letterSpacing: '4px',
                        whiteSpace: 'nowrap', // Forced into a single line
                        textShadow: '0 6px 20px rgba(0,0,0,0.6)'
                    }}
                >
                    {content.hero.title}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{
                        fontSize: '1rem',
                        fontWeight: 300,
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        textShadow: '0 4px 16px rgba(0,0,0,0.55)'
                    }}
                >
                    {content.hero.subtitle}
                </motion.p>
            </div>
        </section>
    );
};

export default Hero;
