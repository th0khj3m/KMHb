import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
  loadAvgRating,
  removeRating,
  updateRating,
} from "../store/rating/rating.actions";
import { WhiteTypography } from "../routes/root";
import useIsRating from "../hooks/useIsRating";
import { setMovieRating } from "../store/rating/rating.reducers";

export default function RatingBox({ movie, include = false }) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState("?");
  const { movieRatings } = useSelector((state) => state.rating);

  const movieId = movie?.id;
  const movieTitle = movie?.title;

  const { openModal, handleOpenModal, handleCloseModal } = useModal();
  const userRating = useIsRating(movieId);

  useEffect(() => {
    if (userRating) {
      setRating(userRating);
    }
  }, [userRating]);

  useEffect(() => {
    const fetchAndSetRating = async () => {
      try {
        const movieTMDbRating = movie?.vote_average?.toFixed(1);
        // Fetch average rating
        const avgRating = await dispatch(loadAvgRating(movieId)).unwrap();
        // Calculate combined rating
        const averageRating =
          (Number(movieTMDbRating) + Number(avgRating.average_rating)) / 2;

        // Dispatch action to set combined rating
        dispatch(
          setMovieRating({
            movieId,
            rating: avgRating.average_rating
              ? averageRating
              : Number(movieTMDbRating),
          })
        );
      } catch (err) {
        console.error("Error fetching or setting rating:", err);
      }
    };

    if (movieId) {
      fetchAndSetRating();
    }
  }, [dispatch, movieId, movie?.vote_average, userRating]);

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
      <Box display={"flex"} alignItems={"center"} ml={include ? "auto" : "0"}>
        <Stack direction={"row"} alignItems={"center"}>
          {include && <WhiteTypography mr={1}>KMHb RATING</WhiteTypography>}
          <StarIcon
            fontSize="small"
            sx={{ color: include ? "main" : "black" }}
          />
          <Typography ml={1} sx={{ color: include ? "white" : "black" }}>
            {movieRatings[movieId]?.toFixed(1)}
          </Typography>
        </Stack>

        <Stack ml={3} direction={"row"} alignItems={"center"}>
          {include && <WhiteTypography>YOUR RATING</WhiteTypography>}
          {userRating ? (
            <Button
              size="large"
              startIcon={<StarIcon />}
              onClick={() => handleOpenModal(movieId)}
            >
              {rating}
            </Button>
          ) : (
            <IconButton size="medium" onClick={() => handleOpenModal(movieId)}>
              <StarBorderIcon sx={{ color: "#0db597" }} fontSize="inherit" />
            </IconButton>
          )}
        </Stack>
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
