import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import content from './data/content.json';

function App() {
    const categories = [...new Set(content.portfolio.map(item => item.category))];
    const [portfolioCategory, setPortfolioCategory] = useState(categories[0]);

    return (
        <div className="app">
            <FloatingContact />
            <Navbar setPortfolioCategory={setPortfolioCategory} />
            <Hero />
            <Portfolio portfolioCategory={portfolioCategory} setPortfolioCategory={setPortfolioCategory} />
            <About />
            <Contact />
            <Footer />
        </div>
    );
}

export default App;
