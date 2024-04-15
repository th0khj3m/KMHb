import React, { useState } from "react";
import { Rating } from "@mui/material";

export default function useRating() {
  const [rating, setRating] = useState("?");

  const handleRating = (event, newValue) => {
    setRating(newValue);
  };

  return {
    ratingComponent: (
      <Rating
        name="rating"
        max={10}
        precision={1}
        size="large"
        onChange={handleRating}
        sx={{ marginBottom: "15px", color: "main" }}
      />
    ),
    rating,
    handleRating
  };
}
