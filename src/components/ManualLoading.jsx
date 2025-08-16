import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/loading.json';
import { useTranslation } from 'react-i18next';

const ManualLoading = ({ isVisible = true, text, size = 'large' }) => {
  const { t } = useTranslation();

  if (!isVisible) return null;

  const sizeClasses = {
    small: 'w-32 h-32 sm:w-40 sm:h-40',
    medium: 'w-48 h-48 sm:w-56 sm:h-56',
    large: 'w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Lottie Animation */}
      <div className={sizeClasses[size]}>
        <Lottie 
          animationData={loadingAnimation} 
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      
      {/* Loading Text */}
      <div className="mt-6 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-[#396961] mb-2">
          {text || t('common.loading')}
        </h2>
      </div>
      
      {/* Loading Dots Animation */}
      <div className="flex space-x-2 mt-4">
        <div className="w-2 h-2 bg-[#396961] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-[#396961] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-[#396961] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
};

export default ManualLoading; 
