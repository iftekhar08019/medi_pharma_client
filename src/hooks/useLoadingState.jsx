import { useEffect } from 'react';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { useLoading } from './useLoadingContext';
import { useTranslation } from 'react-i18next';

export const useLoadingState = () => {
  const { showLoading, hideLoading } = useLoading();
  const { t } = useTranslation();
  
  // Get React Query loading states
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  useEffect(() => {
    const isLoading = isFetching > 0 || isMutating > 0;
    
    if (isLoading) {
      let loadingText = t('common.loading');
      
      if (isMutating > 0) {
        loadingText = 'Processing...';
      } else if (isFetching > 0) {
        loadingText = 'Loading data...';
      }
      
      showLoading(loadingText);
    } else {
      hideLoading();
    }
  }, [isFetching, isMutating, showLoading, hideLoading, t]);

  return {
    isLoading: isFetching > 0 || isMutating > 0,
    isFetching: isFetching > 0,
    isMutating: isMutating > 0,
  };
}; 
