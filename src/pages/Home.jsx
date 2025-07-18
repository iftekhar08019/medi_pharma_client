import React from 'react';
import Hero from '../components/Hero';
import CategorySection from '../components/CatagorySection';
import DiscountProductsSlider from '../components/DiscountedProductSlider';
import MarqueeSection from '../components/MarqueeSection';

const Home = () => {
    return (
        <div className='w-[96%] mx-auto'>
            <Hero />
            <CategorySection />
            <DiscountProductsSlider />
            <MarqueeSection />
        </div>
    );
};

export default Home;
