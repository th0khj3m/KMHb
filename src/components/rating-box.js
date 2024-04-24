import React, { useState, useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { IconButton, Button } from "@mui/material";

import useModal from "../hooks/useModal";
import ModalRender from "./modal-render";
import RatingModal from "./modal/rating-modal";
import {
  addRating,
  removeRating,
  updateRating,
} from "../store/rating/rating.actions";
import { useDispatch } from "react-redux";
import { WhiteTypography } from "../routes/root";

export default function RatingBox({
  movie: { movieRating, movieTitle, movieId, userRating },
  size = "small",
  cut = false,
}) {
  const dispatch = useDispatch();
  const { openModal, handleOpenModal, handleCloseModal } = useModal();
  const [rating, setRating] = useState("?"); // Initial state

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

  const handleRatingRemove = (movieId) => {
    dispatch(removeRating(movieId));
    setRating("?");
    handleCloseModal();
  };

  return (
    <>
      <Box display={"flex"} alignItems={"center"}>
        {!cut && (
          <Stack direction={"row"} display={"flex"} alignItems={"center"}>
            <StarIcon fontSize={size} />
            <Typography ml={"3px"}>{movieRating}</Typography>
          </Stack>
        )}
        {cut && <WhiteTypography mr={"-10px"}>YOUR RATING</WhiteTypography>}
        <Box ml={3} alignItems={"center"}>
          {userRating ? (
            <Button
              size="large"
              startIcon={<StarIcon />}
              onClick={() => handleOpenModal(movieId)}
            >
              {rating}
            </Button>
          ) : (
            <IconButton onClick={() => handleOpenModal(movieId)}>
              <StarBorderIcon sx={{ color: "#0db597" }} fontSize="medium" />
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
          handleRatingRemove,
          handleCloseModal,
        }}
      />
    </>
  );
}
