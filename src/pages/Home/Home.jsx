import React from 'react';
import Hero from './components/Hero';
import CategorySection from './components/CatagorySection';
import DiscountProductsSlider from './components/DiscountedProductSlider';
import MarqueeSection from './components/MarqueeSection';
import BenefitsSection from './components/BenefitsSection';


const Home = () => {
    return (
        <div >
            <Hero />
            <CategorySection />
            <DiscountProductsSlider />
            <MarqueeSection />
            <BenefitsSection />
           
        </div>
    );
};

export default Home;
