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
    // Only show the global full-screen loader for mutations (e.g., form submits)
    // Let pages handle their own fetching states to avoid covering navbar/layout
    if (isMutating > 0) {
      const loadingText = 'Processing...';
      showLoading(loadingText);
    } else {
      hideLoading();
    }
  }, [isMutating, showLoading, hideLoading]);

  return {
    isLoading: isMutating > 0,
    isFetching: isFetching > 0, // exposed for consumers if needed
    isMutating: isMutating > 0,
  };
}; 
