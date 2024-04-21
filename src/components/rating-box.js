import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, Button, Stack } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import useModal from "../hooks/useModal";
import ModalRender from "./modal-render";
import RatingModal from "./modal/rating-modal";
import { addRating, updateRating } from "../store/rating/rating.actions";
import { useDispatch } from "react-redux";

export default function RatingBox({
  movie: { movieRating, movieTitle, movieId, userRating },
}) {
  const dispatch = useDispatch();
  const { openModal, handleOpenModal, handleCloseModal } = useModal();
  const [rating, setRating] = useState(movieRating); // Initial state

  useEffect(() => {
    if (userRating) {
      setRating(userRating);
    }
  }, [userRating]);

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleRatingConfirm = (movieId) => {
    dispatch(addRating({ movieId, rating }));
    setRating("?");
  };

  const handleRatingUpdate = (movieId) => {
    dispatch(updateRating({ movieId, rating }));
    setRating("?");
  };

  return (
    <>
      <Box display={"flex"} alignItems={"center"}>
        <Stack direction={"row"} display={"flex"} alignItems={"center"}>
          <StarIcon fontSize="small" />
          <Typography ml={"3px"}>{movieRating}</Typography>
        </Stack>
        <Box ml={3}>
          {userRating ? (
            <Button
              size="large"
              startIcon={<StarIcon color="primary" />}
              onClick={() => handleOpenModal(movieId)}
            >
              {rating}
            </Button>
          ) : (
            <IconButton onClick={() => handleOpenModal(movieId)}>
              <StarBorderIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Box>
      <ModalRender
        isOpen={openModal}
        handleClose={handleCloseModal}
        Component={RatingModal}
        modalProps={{
          movieId,
          movieTitle,
          rating,
          userRating,
          handleRatingChange,
          handleRatingConfirm,
          handleRatingUpdate,
          handleCloseModal,
        }}
      />
    </>
  );
}
