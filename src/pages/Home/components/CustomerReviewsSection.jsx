import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const CustomerReviewsSection = () => {
    const { t } = useTranslation();
    const [currentReview, setCurrentReview] = useState(0);

    const reviews = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Regular Customer",
            rating: 5,
            comment: "MediPharma has been a lifesaver! The quality of medicines and fast delivery service is exceptional. I've been using their platform for over a year now.",
            avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=396961&color=fff&rounded=true&size=80",
            location: "New York, NY"
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Healthcare Professional",
            rating: 5,
            comment: "As a pharmacist, I appreciate the authenticity and quality of products. The platform is user-friendly and the customer support is outstanding.",
            avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=2e7153&color=fff&rounded=true&size=80",
            location: "Los Angeles, CA"
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            role: "Verified Buyer",
            rating: 5,
            comment: "The best online pharmacy I've ever used! Competitive prices, genuine products, and lightning-fast delivery. Highly recommended!",
            avatar: "https://ui-avatars.com/api/?name=Emily+Rodriguez&background=396961&color=fff&rounded=true&size=80",
            location: "Miami, FL"
        },
        {
            id: 4,
            name: "David Thompson",
            role: "Long-term Customer",
            rating: 5,
            comment: "Outstanding service and quality! I've been ordering my medications here for 2 years and never had any issues. Trustworthy platform.",
            avatar: "https://ui-avatars.com/api/?name=David+Thompson&background=2e7153&color=fff&rounded=true&size=80",
            location: "Chicago, IL"
        }
    ];

    const nextReview = () => {
        setCurrentReview((prev) => (prev + 1) % reviews.length);
    };

    const prevReview = () => {
        setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    const goToReview = (index) => {
        setCurrentReview(index);
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <FaStar
                key={index}
                className={`w-5 h-5 ${
                    index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
            />
        ));
    };

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0  opacity-60"></div>
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl"></div>
            
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                        {t('reviews.title')}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        {t('reviews.subtitle')}
                    </p>
                </motion.div>

                {/* Reviews Carousel */}
                <div className="relative">
                    {/* Main Review Display */}
                    <div className="relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentReview}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16"
                            >
                                {/* Decorative Elements */}
                                <div className="absolute top-0 left-0 w-32 h-32 rounded-full blur-2xl"></div>
                                <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full blur-2xl"></div>
                                {/* Review Content - Left Side */}
                                <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
                                    <div className="mb-6">
                                        <FaQuoteLeft className="text-6xl text-[#396961]/20 mx-auto lg:mx-0 mb-4" />
                                        <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                            "{reviews[currentReview].comment}"
                                        </p>
                                    </div>
                                    
                                    <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                                        {renderStars(reviews[currentReview].rating)}
                                    </div>
                                    
                                    <div className="mb-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                                            {reviews[currentReview].name}
                                        </h3>
                                        <p className="text-[#396961] font-medium mb-1">
                                            {reviews[currentReview].role}
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                            {reviews[currentReview].location}
                                        </p>
                                    </div>
                                </div>

                                {/* Avatar - Right Side */}
                                <div className="flex-1 order-1 lg:order-2 flex justify-center lg:justify-end">
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        className="relative"
                                    >
                                        <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden shadow-2xl border-4 border-white">
                                            <img
                                                src={reviews[currentReview].avatar}
                                                alt={reviews[currentReview].name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-[#396961] to-[#2e7153] rounded-full flex items-center justify-center shadow-lg">
                                            <FaQuoteLeft className="text-white text-lg" />
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex items-center justify-center gap-4 mt-12">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={prevReview}
                            className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-[#396961] group"
                        >
                            <FaChevronLeft className="text-gray-600 group-hover:text-[#396961] transition-colors" />
                        </motion.button>

                        {/* Review Indicators */}
                        <div className="flex gap-2">
                            {reviews.map((_, index) => (
                                <motion.button
                                    key={index}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.8 }}
                                    onClick={() => goToReview(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                        index === currentReview
                                            ? 'bg-[#396961] scale-125'
                                            : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                />
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={nextReview}
                            className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-[#396961] group"
                        >
                            <FaChevronRight className="text-gray-600 group-hover:text-[#396961] transition-colors" />
                        </motion.button>
                    </div>
                </div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {[
                        { number: "50K+", label: t('reviews.stats.customers'), icon: "😊" },
                        { number: "99.8%", label: t('reviews.stats.satisfaction'), icon: "⭐" },
                        { number: "24/7", label: t('reviews.stats.support'), icon: "🛟" },
                        { number: "100%", label: t('reviews.stats.products'), icon: "✅" }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="text-4xl mb-3">{stat.icon}</div>
                            <div className="text-3xl font-bold text-[#396961] mb-2">
                                {stat.number}
                            </div>
                            <div className="text-gray-600 font-medium">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default CustomerReviewsSection;
