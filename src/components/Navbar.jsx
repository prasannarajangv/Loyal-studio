import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import content from '../data/content.json';
import { useNavigate } from 'react-router-dom';

const LinkItem = ({ link, isMobile = false, onNavigate }) => (
    <span
        onClick={() => onNavigate(link.path)}
        onMouseEnter={(e) => !isMobile && (e.target.style.opacity = '1')}
        onMouseLeave={(e) => !isMobile && (e.target.style.opacity = '0.85')}
        style={{
            cursor: 'pointer',
            textTransform: 'uppercase',
            fontSize: isMobile ? '0.9rem' : 'clamp(0.65rem, 1.5vw, 0.85rem)',
            letterSpacing: '2px',
            fontFamily: 'var(--font-heading)',
            margin: isMobile ? '0' : 'clamp(0.5rem, 2vw, 2.5rem)',
            fontWeight: 500,
            opacity: 0.85,
            whiteSpace: 'nowrap',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            paddingBottom: '4px'
        }}
        className="nav-link"
    >
        {link.title}
        {!isMobile && (
            <span style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '0%',
                height: '2px',
                background: 'var(--color-accent)',
                transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }} className="nav-underline"></span>
        )}
    </span>
);

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const navRef = useRef(null);

    // Drive navbar blur/shadow straight on the DOM node via rAF, bypassing
    // React state/re-render on every scroll pixel (was causing scroll jank
    // site-wide, since Navbar renders on every page).
    useEffect(() => {
        let ticking = false;

        const applyScrollStyles = () => {
            ticking = false;
            const node = navRef.current;
            if (!node) return;
            const scrollY = window.scrollY;
            // Starts subtle, becomes fully opaque after scrolling 100px
            const navOpacity = Math.min(scrollY / 100, 1);
            const blurAmount = Math.min(scrollY / 50, 16); // 0px -> 16px over 50px scroll
            node.style.backdropFilter = `blur(${blurAmount}px)`;
            node.style.WebkitBackdropFilter = `blur(${blurAmount}px)`;
            node.style.boxShadow = `0 ${navOpacity * 4}px ${navOpacity * 30}px rgba(0, 0, 0, ${navOpacity * 0.1})`;
        };

        const handleScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(applyScrollStyles);
            }
        };

        applyScrollStyles(); // set initial state (e.g. navigating in mid-scroll)
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const categories = [...new Set(content.portfolio.map(item => item.category))];

    const navigate = useNavigate();

    const slug = (s) => encodeURIComponent(s.toLowerCase().replace(/\s+/g, '-'));

    const navigateTo = (path) => {
        setIsOpen(false);
        setShowDropdown(false);
        navigate(path);
    };

    const handleCategoryClick = (cat) => {
        navigateTo(`/portfolio/${slug(cat)}`);
    };

    const leftLinks = [
        { title: 'Home', path: '/' },
        { title: 'About', path: '/about' },
    ];

    const rightLinks = [
        { title: 'Contact', path: '/contact' },
    ];

    return (
        <nav ref={navRef} style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            background: 'transparent',
            backdropFilter: 'blur(0px)',
            WebkitBackdropFilter: 'blur(0px)',
            zIndex: 1000,
            borderBottom: 'none',
            color: 'white',
            width: '100%',
            boxShadow: '0 0px 0px rgba(0, 0, 0, 0)',
            transition: 'all 0.15s ease-out'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 'clamp(50px, 8vw, 80px)',
                maxWidth: '100%',
                padding: '0 clamp(0.75rem, 2vw, 2rem)',
                position: 'relative',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>

                {/* Desktop Left Links */}
                <div className="desktop-menu-left" style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: 'clamp(0.5rem, 1.5vw, 2rem)',
                    flex: 1
                }}>
                    {leftLinks.map((link) => <LinkItem key={link.title} link={link} onNavigate={navigateTo} />)}
                </div>

                {/* Centered Logo */}
                <div
                    onClick={() => navigateTo('/')}
                    style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                        cursor: 'pointer',
                        fontWeight: 700,
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        zIndex: 2,
                        textTransform: 'uppercase',
                        letterSpacing: 'clamp(2px, 0.3vw, 4px)',
                        flex: '0 1 auto',
                        padding: '0 clamp(0.5rem, 1vw, 3rem)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        minWidth: 'fit-content',
                        opacity: 0.95
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '1';
                        e.currentTarget.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '0.9';
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                    className="nav-logo"
                >
                    {content.meta.title}
                </div>

                {/* Desktop Right Links */}
                <div className="desktop-menu-right" style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: 'clamp(0.5rem, 1.5vw, 2rem)',
                    flex: 1,
                    justifyContent: 'flex-end'
                }}>
                    {/* Portfolio Dropdown */}
                    <div
                        style={{ position: 'relative', display: 'inline-block' }}
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)}
                    >
                        <span
                            onClick={() => navigateTo('/portfolio')}
                            onMouseEnter={(e) => (e.target.style.opacity = '1')}
                            onMouseLeave={(e) => (e.target.style.opacity = '0.85')}
                            style={{
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                                fontSize: 'clamp(0.65rem, 1.5vw, 0.85rem)',
                                letterSpacing: '2px',
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 500,
                                opacity: 0.85,
                                whiteSpace: 'nowrap',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                paddingBottom: '4px',
                                position: 'relative',
                                display: 'inline-block'
                            }}
                        >
                            Portfolio
                            {showDropdown && (
                                <span style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '2px',
                                    background: 'var(--color-accent)',
                                    animation: 'slideIn 0.3s ease-out'
                                }}></span>
                            )}
                        </span>
                        {showDropdown && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 'calc(100% + 10px)',
                                    right: 0,
                                    background: 'rgba(20, 20, 20, 0.95)',
                                    backdropFilter: 'blur(10px)',
                                    WebkitBackdropFilter: 'blur(10px)',
                                    minWidth: 'max(150px, 20vw)',
                                    padding: 'clamp(0.5rem, 1vw, 1rem) 0',
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                                    zIndex: 1001,
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '12px',
                                    animation: 'dropIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                            >
                                {categories.map((cat, idx) => (
                                    <div
                                        key={cat}
                                        onClick={() => handleCategoryClick(cat)}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'rgba(197, 160, 89, 0.15)';
                                            e.currentTarget.style.transform = 'translateX(4px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.transform = 'translateX(0)';
                                        }}
                                        style={{
                                            padding: 'clamp(0.5rem, 1vw, 0.75rem) clamp(0.75rem, 1.5vw, 1.5rem)',
                                            cursor: 'pointer',
                                            fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                            transition: 'all 0.2s ease',
                                            borderLeft: '2px solid transparent',
                                            animation: `slideInItem 0.3s ease-out ${idx * 0.05}s backwards`
                                        }}
                                    >
                                        {cat}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {rightLinks.map((link) => <LinkItem key={link.title} link={link} onNavigate={navigateTo} />)}
                </div>

                {/* Mobile Menu Button */}
                <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={{
                    cursor: 'pointer',
                    position: 'absolute',
                    right: 'clamp(0.75rem, 2vw, 1.5rem)',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'none',
                    zIndex: 2000,
                    transition: 'all 0.3s ease',
                    opacity: 0.85
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.85')}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: 'rgba(10, 10, 10, 0.98)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    padding: 'clamp(1rem, 2vw, 2rem)',
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    textAlign: 'center',
                    color: 'var(--color-text)',
                    zIndex: 999,
                    animation: 'slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>
                    <div onClick={() => navigateTo('/')} 
                        style={{ 
                            padding: '0.75rem 0', 
                            cursor: 'pointer', 
                            textTransform: 'uppercase',
                            fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                            transition: 'all 0.2s ease',
                            opacity: 0.9
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
                    >Home</div>
                    <div onClick={() => navigateTo('/about')} 
                        style={{ 
                            padding: '0.75rem 0', 
                            cursor: 'pointer', 
                            textTransform: 'uppercase',
                            fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                            transition: 'all 0.2s ease',
                            opacity: 0.9
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
                    >About</div>

                    <div style={{ 
                        padding: '1rem 0', 
                        fontWeight: 'bold', 
                        textTransform: 'uppercase', 
                        borderTop: '1px solid rgba(255,255,255,0.05)', 
                        marginTop: '1rem',
                        fontSize: 'clamp(0.75rem, 1.8vw, 0.95rem)',
                        opacity: 0.75
                    }}>Portfolio</div>
                    {categories.map((cat, idx) => (
                        <div
                            key={cat}
                            onClick={() => handleCategoryClick(cat)}
                            style={{
                                padding: '0.75rem 0',
                                cursor: 'pointer',
                                fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)',
                                textTransform: 'uppercase',
                                color: 'var(--color-dark-gray)',
                                transition: 'all 0.2s ease',
                                opacity: 0.85,
                                animation: `slideInItem 0.3s ease-out ${idx * 0.05}s backwards`
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.85'}
                        >
                            {cat}
                        </div>
                    ))}
                    <div onClick={() => navigateTo('/contact')} 
                        style={{ 
                            padding: '0.75rem 0', 
                            cursor: 'pointer', 
                            textTransform: 'uppercase',
                            fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                            transition: 'all 0.2s ease',
                            opacity: 0.9
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
                    >Contact</div>
                </div>
            )}

            <style>{`
                @keyframes slideIn {
                    from {
                        width: 0;
                        opacity: 0;
                    }
                    to {
                        width: 100%;
                        opacity: 1;
                    }
                }

                @keyframes dropIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideInItem {
                    from {
                        opacity: 0;
                        transform: translateX(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .nav-link:hover .nav-underline {
                    width: 100% !important;
                }

                .nav-logo {
                    transform-origin: center;
                }

                @media (max-width: 1024px) {
                    .desktop-menu-left,
                    .desktop-menu-right {
                        display: none !important;
                    }
                    .mobile-toggle {
                        display: block !important;
                    }
                }
                @media (min-width: 1025px) {
                    .desktop-menu-left,
                    .desktop-menu-right {
                        display: flex !important;
                    }
                    .mobile-toggle {
                        display: none !important;
                    }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
