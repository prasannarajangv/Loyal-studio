import React, { useState, useEffect, useRef } from 'react';
import content from '../data/content.json';
import { motion, AnimatePresence } from 'framer-motion';
import { buildSrcSet } from '../utils/responsiveImage';
import { noDownloadProps, noDownloadStyle } from '../utils/imageProtection';

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
                        src={content.hero.images[currentIndex].src}
                        srcSet={buildSrcSet(content.hero.images[currentIndex].src, HERO_WIDTHS)}
                        sizes="100vw"
                        alt=""
                        loading={currentIndex === 0 ? 'eager' : 'lazy'}
                        fetchPriority={currentIndex === 0 ? 'high' : 'auto'}
                        decoding={currentIndex === 0 ? 'sync' : 'async'}
                        {...noDownloadProps}
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{ opacity: 1, scale: 1.12 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            opacity: { duration: 1.2, ease: 'easeInOut' },
                            scale: { duration: 3.6, ease: 'easeOut' }
                        }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            // Per-image focal point: on narrow/mobile crops, a wide
                            // shot with off-center subjects (e.g. a couple framed
                            // toward one side) gets cut off under plain "center"
                            // cropping. transformOrigin matches objectPosition so
                            // the Ken Burns zoom above also stays anchored on the
                            // subject instead of pulling away from it.
                            objectPosition: content.hero.images[currentIndex].focalPoint,
                            transformOrigin: content.hero.images[currentIndex].focalPoint,
                            filter: 'brightness(0.35)',
                            ...noDownloadStyle
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

        </section>
    );
};

export default Hero;
