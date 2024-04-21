import React from "react";

import { Box, Button, Typography, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function RatingModal({
  movieId,
  movieTitle,
  userRating,
  rating,
  handleRatingChange,
  handleRatingConfirm,
  handleRatingUpdate,
  handleCloseModal,
}) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        padding: "4rem",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
        backgroundColor: "white",
        alignItems: "center",
        gap: "10px",
        borderRadius: "5px",
        border: "1px solid black",
      }}
    >
      <StarIcon
        sx={{
          position: "absolute",
          left: "50%",
          bottom: "35%",
          transform: "translate(-50%, -80%)",
          fontSize: 150,
          color: "main",
        }}
      />
      <Typography
        variant="body2"
        sx={{
          position: "absolute",
          left: "50%",
          top: 0,
          transform: "translate(-50%, -70%)",
          color: "white",
          fontSize: "2.5rem",
        }}
      >
        {rating}
      </Typography>
      <Typography
        id="modal-title"
        variant="h6"
        component="h2"
        sx={{ fontSize: "16px", color: "main", fontWeight: "bold" }}
      >
        RATE THIS
      </Typography>
      <Typography sx={{ fontSize: "1.3em", marginTop: "-10px" }}>
        {movieTitle}
      </Typography>
      <Rating
        name="rating"
        max={10}
        precision={1}
        size="large"
        value={rating}
        onChange={handleRatingChange}
        sx={{ marginBottom: "15px", color: "main" }}
      />
      <Button
        variant="contained"
        disabled={!rating || typeof rating !== "number" || isNaN(rating)}
        sx={{
          width: "60%",
          backgroundColor: "#1F1F1F",
          color: "main",
          "&:hover": {
            backgroundColor: "#424242",
          },
        }}
        onClick={() => {
          if (!isAuthenticated) {
            navigate("/login");
            return;
          }

          if (userRating) {
            handleRatingUpdate(movieId);
          } else {
            handleRatingConfirm(movieId);
          }

          handleCloseModal();
        }}
      >
        Rate
      </Button>
    </Box>
  );
}
