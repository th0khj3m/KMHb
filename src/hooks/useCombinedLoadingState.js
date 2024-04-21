import { useSelector } from 'react-redux';

const useCombinedLoadingState = (loadingStateSlices) => {
  // Return a function that accepts the Redux state and calculates the combined loading state
  return useSelector((state) => {
    // Extract loading state for each slice and return true if any of them are true
    return loadingStateSlices.some((slice) => state[slice].loading);
  });
};

export default useCombinedLoadingState; // Export the hook
