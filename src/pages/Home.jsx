import React from 'react';
import Hero from '../components/Hero';
import CategorySection from '../components/CatagorySection';
import DiscountProductsSlider from '../components/DiscountedProductSlider';
import MarqueeSection from '../components/MarqueeSection';
import BenefitsSection from '../components/BenefitsSection';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className='w-[96%] mx-auto'>
            <Hero />
            <CategorySection />
            <DiscountProductsSlider />
            <MarqueeSection />
            <BenefitsSection />
            <Footer />
        </div>
    );
};

export default Home;
