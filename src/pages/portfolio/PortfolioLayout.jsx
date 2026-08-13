import React from 'react';
import { Outlet } from 'react-router-dom';

const PortfolioLayout = () => {
    return (
        <main>
            <Outlet />
        </main>
    );
};

export default PortfolioLayout;
