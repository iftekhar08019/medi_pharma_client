import React from 'react';
import Hero from '../components/Hero';
import CategorySection from '../components/CatagorySection';

const Home = () => {
    return (
        <div className='w-[96%] mx-auto'>
            <Hero />
            <CategorySection></CategorySection>
        </div>
    );
};

export default Home;
