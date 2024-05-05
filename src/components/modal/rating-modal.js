import React from "react";

import { Stack, Button, Typography, Rating, c } from "@mui/material";
import { ModalStyle } from "../../routes/root";

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
  handleRatingRemove,
  handleCloseModal,
}) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <Stack
      sx={ModalStyle}
      width={"50%"}
      bgcolor={"background.paper"}
      borderRadius={2}
      gap={1}
    >
      <StarIcon
        sx={{
          fontSize: 100,
          color: "main",
        }}
      />
      <Typography
        variant="body2"
        sx={{
          position: "absolute",
          left: "50%",
          top: "11%",
          transform: "translate(-50%, 90%)",
          color: "white",
          fontSize: "1.5rem",
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
      <Stack width={"60%"} spacing={2}>
        <Button
          variant="contained"
          disabled={!rating || typeof rating !== "number" || isNaN(rating)}
          sx={{
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
        {userRating && (
          <Button
            variant="outlined"
            onClick={() => handleRatingRemove(movieId)}
          >
            Remove Rating
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
