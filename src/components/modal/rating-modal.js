import React from "react";

import { Modal, Box, Button, Typography, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

export default function RatingModal({
  openModal,
  handleClose,
  modalMovieIndex,
  rating,
  handleRating,
}) {
  return (
    <Modal open={openModal} onClose={handleClose}>
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
            transform: "translate(-50%, -50%)",
            fontSize: 200,
            color: "main",
          }}
        />
        <Typography
          variant="body2"
          sx={{
            position: "absolute",
            left: "50%",
            top: 0,
            transform: "translate(-50%, -100%)",
            color: "white",
            fontSize: "3rem",
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
          {modalMovieIndex}
        </Typography>
        <Rating
          name="rating"
          max={10}
          precision={1}
          size="large"
          onChange={handleRating}
          sx={{ marginBottom: "15px", color: "main" }}
        />
        <Button
          variant="contained"
          disabled={!rating}
          sx={{ width: "60%", backgroundColor: "#1F1F1F", color: "main" }}
        >
          Rate
        </Button>
      </Box>
    </Modal>
  );
}
