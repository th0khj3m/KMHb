import React, { useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';

const useLoading = () => {
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // Function to show loading
  const handleLoading = (isLoading) => setIsLoading(isLoading);

  // Component to render loading indicator
  const LoadingIndicator = () => {
    return isLoading && <LinearProgress color="success" />;
  };

  // Return loading state and functions to show/hide loading
  return { isLoading, handleLoading, LoadingIndicator };
};

export default useLoading;