# Loading System Documentation

This project implements a comprehensive loading system using Lottie animations from the `loading.json` file in the assets folder.

## Components

### 1. Global Loading (`Loading.jsx`)
- Automatically shows/hides based on React Query states (fetching, mutating)
- Displays a full-screen overlay with the Lottie animation
- Managed by the `useLoadingState` hook

### 2. Page Loading (`PageLoading.jsx`)
- For individual page loading states
- Can be used with `fullScreen` prop for full-screen overlay
- Configurable text and size

### 3. Manual Loading (`ManualLoading.jsx`)
- For inline loading components
- Three sizes: small, medium, large
- Can be shown/hidden manually

## Hooks

### 1. `useLoadingState()`
- Automatically manages global loading based on React Query states
- Already integrated in the App component

### 2. `useLoading()`
- Access to global loading context
- Methods: `showLoading(text)`, `hideLoading()`

### 3. `useManualLoading()`
- Utilities for manual loading control
- Methods: `startLoading(text)`, `stopLoading()`, `withLoading(asyncFn, text)`

## Usage Examples

### Automatic Loading (React Query)
```jsx
// Loading automatically appears during data fetching
const { data, isLoading } = useQuery({
  queryKey: ['products'],
  queryFn: fetchProducts
});
```

### Page-Level Loading
```jsx
import PageLoading from '../components/PageLoading';

if (isLoading) return <PageLoading text="Loading products..." />;
```

### Manual Loading Control
```jsx
import { useManualLoading } from '../hooks/useManualLoading';

const { startLoading, stopLoading, withLoading } = useManualLoading();

// Method 1: Manual control
const handleSave = async () => {
  startLoading('Saving...');
  try {
    await saveData();
  } finally {
    stopLoading();
  }
};

// Method 2: Using withLoading utility
const handleUpload = async () => {
  await withLoading(
    () => uploadFile(),
    'Uploading file...'
  );
};
```

### Inline Loading Component
```jsx
import ManualLoading from '../components/ManualLoading';

<ManualLoading 
  isVisible={isProcessing} 
  text="Processing..." 
  size="medium" 
/>
```

## Architecture

```
LoadingProvider (App.jsx)
├── LoadingContext (context/LoadingContext.js)
├── useLoadingState (hooks/useLoadingState.jsx) - Auto React Query
├── Loading (components/Loading.jsx) - Global overlay
├── PageLoading (components/PageLoading.jsx) - Page-level
├── ManualLoading (components/ManualLoading.jsx) - Inline
└── useManualLoading (hooks/useManualLoading.jsx) - Manual control
```

## Files Modified

1. `src/App.jsx` - Added LoadingProvider and global Loading component
2. `src/main.jsx` - Simplified to use App.jsx
3. Multiple dashboard and page components - Updated with PageLoading

## Animation Details

- Uses `loading.json` Lottie animation from assets folder
- Animation is responsive and scales appropriately
- Includes additional bounce animations for visual appeal
- Branded with your app's color scheme (#396961)
