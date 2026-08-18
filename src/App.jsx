import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import Home from './pages/Home';

const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PortfolioLayout = lazy(() => import('./pages/portfolio/PortfolioLayout'));
const PortfolioIndex = lazy(() => import('./pages/portfolio/PortfolioIndex'));
const PortfolioCategory = lazy(() => import('./pages/portfolio/PortfolioCategory'));
const PortfolioItem = lazy(() => import('./pages/portfolio/PortfolioItem'));

function App() {
    const { pathname } = useLocation();

    return (
        <div className="app">
            {pathname === '/' && <FloatingContact />}
            <Navbar />

            <div className="page-content">
                <Suspense fallback={null}>
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
                </Suspense>
            </div>

            <Footer />
        </div>
    );
}

export default App;
