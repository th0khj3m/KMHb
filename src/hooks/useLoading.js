import React, { useState } from "react";
import { CircularProgress, Box } from "@mui/material";

const useLoading = () => {
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // Function to show loading
  const handleLoading = (isLoading) => setIsLoading(isLoading);

  // Component to render loading indicator
  const LoadingIndicator = () => {
    return (
      isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <CircularProgress variant="determinate" color="success" />
        </Box>
      )
    );
  };

  // Return loading state and functions to show/hide loading
  return { isLoading, handleLoading, LoadingIndicator };
};

export default useLoading;
