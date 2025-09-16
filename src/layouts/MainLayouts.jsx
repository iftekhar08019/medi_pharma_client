import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const MainLayouts = () => {
    return (
        <div>
            <ScrollToTop />
            <Navbar />
            <div className='w-[96%] mx-auto'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayouts;
