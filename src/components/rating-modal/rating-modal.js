import React from "react";
import "./rating-modal.css";

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
      <Box className="modal-box">
        <StarIcon className="rating-icon" sx={{ fontSize: 200 }} />
        <Typography variant="body2" className="rating-value">
          {rating}
        </Typography>
        <Typography
          id="modal-title"
          className="modal-title"
          variant="h6"
          component="h2"
        >
          RATE THIS
        </Typography>
        <Typography className="rating-title">{modalMovieIndex}</Typography>
        <Rating
          name="rating"
          max={10}
          precision={1}
          size="large"
          onChange={handleRating}
          className="rating-stars"
        />
        <Button variant="contained" disabled = {!rating}>Rate</Button>
      </Box>
    </Modal>
  );
}
