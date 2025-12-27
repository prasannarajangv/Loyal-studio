import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import content from '../data/content.json';

const Navbar = ({ setPortfolioCategory }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const categories = [...new Set(content.portfolio.map(item => item.category))];

    // Monitor scroll position
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Smooth scroll function
    const scrollToSection = (id) => {
        setIsOpen(false);
        setShowDropdown(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleCategoryClick = (cat) => {
        setPortfolioCategory(cat);
        scrollToSection('portfolio');
    };

    const leftLinks = [
        { title: 'Home', id: 'home' },
        { title: 'About', id: 'about' },
    ];

    const rightLinks = [
        { title: 'Wedding Films', id: 'portfolio' },
        { title: 'Contact', id: 'contact' },
    ];

    const LinkItem = ({ link }) => (
        <span
            onClick={() => scrollToSection(link.id)}
            style={{
                cursor: 'pointer',
                textTransform: 'uppercase',
                fontSize: '0.8rem',
                letterSpacing: '3px',
                fontFamily: 'var(--font-heading)',
                margin: '0 3rem',
                fontWeight: 500,
                opacity: 0.9,
                whiteSpace: 'nowrap'
            }}
        >
            {link.title}
        </span>
    );

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            background: isScrolled ? 'rgba(51, 51, 51, 0.95)' : 'transparent',
            backdropFilter: isScrolled ? 'blur(5px)' : 'none',
            zIndex: 1000,
            borderBottom: isScrolled ? '1px solid #444' : 'none',
            transition: 'all 0.3s ease',
            color: 'white',
            boxShadow: isScrolled ? '0 2px 10px rgba(0,0,0,0.3)' : 'none'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: isScrolled ? '90px' : '140px',
                maxWidth: '95%',
                position: 'relative',
                transition: 'height 0.3s ease'
            }}>

                {/* Desktop Left Links */}
                <div className="desktop-menu" style={{ display: 'none', flex: 1, textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        {leftLinks.map((link) => <LinkItem key={link.title} link={link} />)}

                        {/* Portfolio Dropdown */}
                        <div
                            style={{ position: 'relative', display: 'inline-block' }}
                        >
                            <span
                                onClick={() => setShowDropdown(!showDropdown)}
                                style={{
                                    cursor: 'pointer',
                                    textTransform: 'uppercase',
                                    fontSize: '0.8rem',
                                    letterSpacing: '3px',
                                    fontFamily: 'var(--font-heading)',
                                    margin: '0 3rem',
                                    fontWeight: 500,
                                    opacity: 0.9,
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                Portfolio +
                            </span>
                            {showDropdown && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        background: 'rgba(51, 51, 51, 0.98)',
                                        minWidth: '200px',
                                        padding: '1rem 0',
                                        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                                        zIndex: 1001,
                                        border: '1px solid #444',
                                        borderRadius: '4px',
                                        marginTop: '10px'
                                    }}
                                    onMouseLeave={() => setShowDropdown(false)}
                                >
                                    {categories.map((cat) => (
                                        <div
                                            key={cat}
                                            onClick={() => handleCategoryClick(cat)}
                                            style={{
                                                padding: '0.75rem 1.5rem',
                                                cursor: 'pointer',
                                                fontSize: '0.75rem',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                transition: 'background 0.3s'
                                            }}
                                            onMouseEnter={(e) => e.target.style.background = '#444'}
                                            onMouseLeave={(e) => e.target.style.background = 'transparent'}
                                        >
                                            {cat}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Centered Logo */}
                <div
                    onClick={() => scrollToSection('home')}
                    style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: isScrolled ? '2rem' : '3.5rem',
                        cursor: 'pointer',
                        fontWeight: 700,
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        zIndex: 2,
                        textTransform: 'uppercase',
                        letterSpacing: '4px',
                        flex: '0 0 auto',
                        margin: '0 6rem',
                        transition: 'all 0.3s ease'
                    }}
                >
                    {content.meta.title}
                </div>

                {/* Desktop Right Links */}
                <div className="desktop-menu" style={{ display: 'none', flex: 1, textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                        {rightLinks.map((link) => <LinkItem key={link.title} link={link} />)}
                    </div>
                </div>

                {/* Mobile Menu Button - Absolute to right */}
                <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={{
                    cursor: 'pointer',
                    position: 'absolute',
                    right: '1.5rem',
                    top: '50%',
                    transform: 'translateY(-50%)'
                }}>
                    {isOpen ? <X /> : <Menu />}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: isScrolled ? '90px' : '140px',
                    left: 0,
                    right: 0,
                    background: 'var(--color-bg)',
                    padding: '2rem',
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    borderBottom: '1px solid var(--color-light-gray)',
                    textAlign: 'center',
                    color: 'var(--color-text)',
                    transition: 'top 0.3s ease'
                }}>
                    <div onClick={() => scrollToSection('home')} style={{ padding: '1rem 0', cursor: 'pointer', textTransform: 'uppercase' }}>Home</div>
                    <div onClick={() => scrollToSection('about')} style={{ padding: '1rem 0', cursor: 'pointer', textTransform: 'uppercase' }}>About</div>

                    <div style={{ padding: '1rem 0', fontWeight: 'bold', textTransform: 'uppercase', borderTop: '1px solid #eee', marginTop: '1rem' }}>Portfolio</div>
                    {categories.map((cat) => (
                        <div
                            key={cat}
                            onClick={() => handleCategoryClick(cat)}
                            style={{
                                padding: '0.75rem 0',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                textTransform: 'uppercase',
                                color: 'var(--color-dark-gray)'
                            }}
                        >
                            {cat}
                        </div>
                    ))}
                    <div onClick={() => scrollToSection('portfolio')} style={{ padding: '1rem 0', cursor: 'pointer', textTransform: 'uppercase', borderTop: '1px solid #eee' }}>Wedding Films</div>
                    <div onClick={() => scrollToSection('contact')} style={{ padding: '1rem 0', cursor: 'pointer', textTransform: 'uppercase' }}>Contact</div>
                </div>
            )}

            <style>{`
        @media (min-width: 768px) {
          .desktop-menu {
            display: block !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
             .container {
                 justify-content: center !important; 
             }
        }
      `}</style>
        </nav>
    );
};

export default Navbar;
