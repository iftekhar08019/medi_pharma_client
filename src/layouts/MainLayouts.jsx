import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const MainLayouts = () => {
    return (
        <div>
            <Navbar />
            <div className='w-[96%] mx-auto'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayouts;
