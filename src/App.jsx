import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PortfolioLayout from './pages/portfolio/PortfolioLayout';
import PortfolioIndex from './pages/portfolio/PortfolioIndex';
import PortfolioCategory from './pages/portfolio/PortfolioCategory';
import PortfolioItem from './pages/portfolio/PortfolioItem';

function App() {
    return (
        <div className="app">
            <FloatingContact />
            <Navbar />

            <div className="page-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<AboutPage />} />

                    <Route path="/portfolio" element={<PortfolioLayout />}>
                        <Route index element={<PortfolioIndex />} />
                        <Route path=":category" element={<PortfolioCategory />} />
                        <Route path=":category/:id" element={<PortfolioItem />} />
                    </Route>

                    <Route path="/contact" element={<ContactPage />} />
                </Routes>
            </div>

            <Footer />
        </div>
    );
}

export default App;
