import React, { useState } from "react";

import RatingModal from "./modal/rating-modal";

import { IconButton, Typography, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function MovieRating({movie}) {
  const [openModal, setOpenModal] = useState(false);
  const [modalMovieIndex, setModalMovieIndex] = useState(null);
  const [rating, setRating] = useState("?");

  const handleOpenRatingModal = () => {
    setOpenModal(true);
    setModalMovieIndex(movie.title);
  };

  return (
    <>
      <Box display={"flex"} alignItems={"center"}>
        <StarIcon />
        <Typography ml={"3px"}>8.4</Typography>
        <IconButton onClick={() => handleOpenRatingModal()} sx={{ ml: "15px" }}>
          <StarBorderIcon />
        </IconButton>
      </Box>

      <RatingModal
        openModal={openModal}
        handleClose={() => {
          setRating("?");
          setOpenModal(false);
        }}
        modalMovieIndex={modalMovieIndex}
        rating={rating}
        handleRating={(event, newValue) => setRating(newValue)}
      />
    </>
  );
}
