import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaEnvelope, FaArrowRight, FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';

const NewsletterSection = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            setIsSubscribed(true);
            setIsLoading(false);
            setEmail('');
            
            // Reset after 3 seconds
            setTimeout(() => setIsSubscribed(false), 3000);
        }, 1000);
    };

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-60"></div>
            <div className="absolute top-0 left-0 w-72 h-72 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
            
            {/* Floating Decorative Elements */}
            <motion.div
                animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                }}
                transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                }}
                className="absolute top-20 right-20 w-4 h-4 bg-[#396961]/20 rounded-full"
            ></motion.div>
            <motion.div
                animate={{ 
                    y: [0, 15, 0],
                    rotate: [0, -5, 0]
                }}
                transition={{ 
                    duration: 8, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 1
                }}
                className="absolute bottom-32 left-16 w-3 h-3 bg-[#2e7153]/20 rounded-full"
            ></motion.div>
            <motion.div
                animate={{ 
                    y: [0, -10, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{ 
                    duration: 7, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 2
                }}
                className="absolute top-1/2 left-1/4 w-2 h-2 rounded-full"
            ></motion.div>
            
            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center relative"
                >
                    {/* Subtle background pattern */}
                    <div className="absolute inset-0 opacity-50">
                        <div className="absolute inset-0 "></div>
                        <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(57, 105, 97, 0.03) 2px, transparent 2px)`,
                            backgroundSize: '60px 60px'
                        }}></div>
                    </div>
                    {/* Icon */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-[#396961] to-[#2e7153] rounded-full mb-8 shadow-2xl relative"
                    >
                        <FaEnvelope className="text-white text-4xl" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#396961] to-[#2e7153] rounded-full blur-xl opacity-50"></div>
                    </motion.div>

                    {/* Heading */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
                    >
                        {t('newsletter.title')}
                    </motion.h2>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
                    >
                        {t('newsletter.subtitle')}
                    </motion.p>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="max-w-lg mx-auto"
                    >
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
                            <motion.form
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Join Our Community</h3>
                                    <p className="text-gray-600">Get the latest updates delivered to your inbox</p>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex-1 relative">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder={t('newsletter.placeholder')}
                                            className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#396961]/20 focus:border-[#396961] transition-all duration-300 text-lg placeholder-gray-400 bg-white/90 backdrop-blur-sm"
                                            required
                                        />
                                        {isSubscribed && (
                                            <motion.div
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                                            >
                                                <FaCheck className="text-white text-sm" />
                                            </motion.div>
                                        )}
                                    </div>
                                    
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="submit"
                                        disabled={isLoading || isSubscribed}
                                        className="px-8 py-4 bg-gradient-to-r from-[#396961] to-[#2e7153] hover:from-[#2e5a52] hover:to-[#235b40] text-white font-semibold rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2 min-w-[140px]"
                                    >
                                        {isLoading ? (
                                            <>
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                                />
                                                {t('newsletter.subscribing')}
                                            </>
                                        ) : isSubscribed ? (
                                            <>
                                                <FaCheck />
                                                {t('newsletter.subscribed')}
                                            </>
                                        ) : (
                                            <>
                                                {t('newsletter.subscribe')}
                                                <FaArrowRight />
                                            </>
                                        )}
                                    </motion.button>
                                </div>
                            </motion.form>
                        </div>
                    </motion.div>

                    {/* Benefits */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8"
                    >
                        {[
                            { icon: "🎯", title: t('newsletter.exclusiveOffers'), desc: t('newsletter.exclusiveOffersDesc'), color: "from-red-500 to-pink-500" },
                            { icon: "💡", title: t('newsletter.healthTips'), desc: t('newsletter.healthTipsDesc'), color: "from-blue-500 to-cyan-500" },
                            { icon: "🚀", title: t('newsletter.newProducts'), desc: t('newsletter.newProductsDesc'), color: "from-green-500 to-emerald-500" }
                        ].map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="group relative"
                            >
                                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 transition-all duration-300 hover:shadow-2xl hover:border-[#396961]/30">
                                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <div className="text-3xl">{benefit.icon}</div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
                                </div>
                                <div className={`absolute inset-0 bg-gradient-to-r ${benefit.color} rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10 blur-xl`}></div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Privacy Note */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="mt-16"
                    >
                        <div className="text-center">
                            <div className="inline-flex items-center gap-3 px-6 py-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 text-lg">🔒</span>
                                </div>
                                <p className="text-sm text-gray-700 font-medium">
                                    {t('newsletter.privacyNote')}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default NewsletterSection;
