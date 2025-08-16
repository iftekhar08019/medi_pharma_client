import { useLoading } from './useLoadingContext';

export const useManualLoading = () => {
  const { showLoading, hideLoading } = useLoading();

  const startLoading = (text = 'Loading...') => {
    showLoading(text);
  };

  const stopLoading = () => {
    hideLoading();
  };

  const withLoading = async (asyncOperation, loadingText = 'Processing...') => {
    try {
      startLoading(loadingText);
      const result = await asyncOperation();
      return result;
    } finally {
      stopLoading();
    }
  };

  return {
    startLoading,
    stopLoading,
    withLoading,
  };
}; 
