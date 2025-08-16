import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/loading.json';
import { useTranslation } from 'react-i18next';

const PageLoading = ({ text, fullScreen = false }) => {
  const { t } = useTranslation();

  const containerClasses = fullScreen
    ? "fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-95 backdrop-blur-sm"
    : "flex items-center justify-center min-h-[400px] w-full";

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center justify-center p-8">
        {/* Large Lottie Animation */}
        <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80">
          <Lottie 
            animationData={loadingAnimation} 
            loop={true}
            autoplay={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        
        {/* Loading Text */}
        <div className="mt-6 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#396961] mb-2">
            {text || t('common.loading')}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            {t('common.loading')}
          </p>
        </div>
        
        {/* Loading Dots Animation */}
        <div className="flex space-x-2 mt-4">
          <div className="w-3 h-3 bg-[#396961] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-[#396961] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-[#396961] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default PageLoading; 
