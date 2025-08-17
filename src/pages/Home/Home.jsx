import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import Hero from './components/Hero';
import CategorySection from './components/CatagorySection';
import DiscountProductsSlider from './components/DiscountedProductSlider';
import MarqueeSection from './components/MarqueeSection';
import BenefitsSection from './components/BenefitsSection';
import NewsletterSection from './components/NewsletterSection';
import CustomerReviewsSection from './components/CustomerReviewsSection';

const Home = () => {
    const { t } = useTranslation();
    
    return (
        <>
            <Helmet>
                <title>{t('home.title')}</title>
            </Helmet>
            <div >
                <Hero />
                <CategorySection />
                <DiscountProductsSlider />
                <MarqueeSection />
                <BenefitsSection />
                <CustomerReviewsSection />
                <NewsletterSection />
            </div>
        </>
    );
};

export default Home;
