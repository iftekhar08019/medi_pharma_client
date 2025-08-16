import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/loading.json';
import { useLoading } from '../hooks/useLoadingContext';
import { useTranslation } from 'react-i18next';

const Loading = () => {
  const { isLoading, loadingText } = useLoading();
  const { t } = useTranslation();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center p-8">
        {/* Large Lottie Animation */}
        <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
          <Lottie 
            animationData={loadingAnimation} 
            loop={true}
            autoplay={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        
        {/* Loading Text */}
        <div className="mt-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#396961] mb-2">
            {loadingText || t('common.loading')}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
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

export default Loading; 
