import React, { useState } from "react";

import RatingModal from "./modal/rating-modal";

import { IconButton, Typography, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useModal } from "../hooks/useModal";

export default function MovieRating({movie}) {
  const { openModal, handleOpenModal, handleCloseModal, modalIndex } = useModal();
  const [rating, setRating] = useState("?");

  return (
    <>
      <Box display={"flex"} alignItems={"center"}>
        <StarIcon />
        <Typography ml={"3px"}>8.4</Typography>
        <IconButton onClick={() => handleOpenModal(movie)} sx={{ ml: "15px" }}>
          <StarBorderIcon />
        </IconButton>
      </Box>

      <RatingModal
        isOpen={openModal}
        handleClose={handleCloseModal}
        modalMovieIndex={modalIndex}
        rating={rating}
        handleRating={(event, newValue) => setRating(newValue)}
      />
    </>
  );
}
