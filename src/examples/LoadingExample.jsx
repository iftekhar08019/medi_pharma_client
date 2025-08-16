import React from 'react';
import { useManualLoading } from '../hooks/useManualLoading';
import { useLoading } from '../hooks/useLoadingContext';
import ManualLoading from '../components/ManualLoading';
import PageLoading from '../components/PageLoading';

// Example component showing different ways to use the loading system
const LoadingExample = () => {
  const { startLoading, stopLoading, withLoading } = useManualLoading();
  const { isLoading } = useLoading();

  // Example 1: Manual control
  const handleManualLoading = () => {
    startLoading('Processing your request...');
    setTimeout(() => {
      stopLoading();
    }, 3000);
  };

  // Example 2: Using withLoading for async operations
  const handleAsyncOperation = async () => {
    await withLoading(
      async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Operation completed!');
      },
      'Uploading files...'
    );
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Loading System Examples</h1>
      
      <div className="space-y-4">
        <button 
          onClick={handleManualLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Start Manual Loading (3s)
        </button>
        
        <button 
          onClick={handleAsyncOperation}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Async Operation with Loading
        </button>
      </div>

      {/* Manual Loading component example */}
      <div className="border p-4 rounded">
        <h3 className="font-bold mb-2">Manual Loading Component:</h3>
        <ManualLoading isVisible={!isLoading} text="Custom loading text" size="medium" />
      </div>

      {/* Page Loading component example */}
      <div className="border p-4 rounded h-64">
        <h3 className="font-bold mb-2">Page Loading Component:</h3>
        <PageLoading text="Loading page content..." />
      </div>
    </div>
  );
};

export default LoadingExample;
