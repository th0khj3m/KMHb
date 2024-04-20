import React, { useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import useModal from "../hooks/useModal";
import ModalRender from "./modal-render";
import RatingModal from "./modal/rating-modal";
import useRating from "../hooks/useRating";

export default function RatingBox({ movie: {movieTitle, movieId} }) {
  const { openModal, handleOpenModal, handleCloseModal } = useModal();
  const { rating, handleRatingChange, handleRatingConfirm } = useRating();

  // useEffect(() => {
  //   // Fetch user rating on component mount or rating change
  //   const fetchRating = async () => {
  //     const userRating = await getUserRating(movieId); // Replace with your logic
  //     setUserRating(userRating);
  //   };

  //   fetchRating();
  // }, [movieId, rating]);

  return (
    <>
      <Box display={"flex"} alignItems={"center"}>
        <StarIcon />
        <Typography ml={"3px"}>8.4</Typography>
        <IconButton onClick={() => handleOpenModal(movieId)} sx={{ ml: "15px" }}>
          <StarBorderIcon />
        </IconButton>
      </Box>
      <ModalRender
        isOpen={openModal}
        handleClose={handleCloseModal}
        Component={RatingModal}
        modalProps={{
          movieId,
          movieTitle,
          rating,
          handleRatingChange,
          handleRatingConfirm,
          handleCloseModal
        }}
      />
    </>
  );
}
