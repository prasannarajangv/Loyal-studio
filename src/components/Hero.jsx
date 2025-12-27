import React, { useState, useEffect } from 'react';
import content from '../data/content.json';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % content.hero.images.length);
        }, 3000);
        return () => clearInterval(timer);
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
            color: 'white'
        }}>
            {/* Background Image Slider */}
            <AnimatePresence initial={false}>
                <motion.div
                    key={currentIndex}
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
                        backgroundImage: `url(${content.hero.images[currentIndex]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'brightness(0.6)'
                    }}
                />
            </AnimatePresence>

            {/* Content */}
            <div className="container" style={{
                position: 'relative',
                textAlign: 'center',
                zIndex: 1,
                paddingBottom: '3rem', // Moved to the "dead end"
                opacity: 0.5
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
                        whiteSpace: 'nowrap' // Forced into a single line
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
                        textTransform: 'uppercase'
                    }}
                >
                    {content.hero.subtitle}
                </motion.p>
            </div>
        </section>
    );
};

export default Hero;
