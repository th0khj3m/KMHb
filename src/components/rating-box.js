import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { Box, Typography, Stack, IconButton, Button } from "@mui/material";
import {
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from "@mui/icons-material";

import useModal from "../hooks/useModal";
import ModalRender from "./modal-render";
import RatingModal from "./modal/rating-modal";
import {
  addRating,
  removeRating,
  updateRating,
} from "../store/rating/rating.actions";
import { WhiteTypography } from "../routes/root";
import useIsRating from "../hooks/useIsRating";

export default function RatingBox({ movie, size = "small", cut = false }) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState("?");

  const movieId = movie?.id;
  const movieTitle = movie?.title;
  const movieRating = movie?.vote_average?.toFixed(1);

  const { openModal, handleOpenModal, handleCloseModal } = useModal();
  const userRating = useIsRating(movieId);

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
