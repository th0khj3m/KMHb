import React from "react";
import { Box, Typography, IconButton, Button, Stack } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import useModal from "../hooks/useModal";
import ModalRender from "./modal-render";
import RatingModal from "./modal/rating-modal";
import useRating from "../hooks/useRating";

export default function RatingBox({
  movie: { movieRating, movieTitle, movieId, userRating },
}) {
  const { openModal, handleOpenModal, handleCloseModal } = useModal();
  const { rating, handleRatingChange, handleRatingConfirm } = useRating();

  return (
    <>
      <Box display={"flex"} alignItems={"center"}>
        <Stack direction={"row"} display={"flex"} alignItems={"center"}>
          <StarIcon fontSize="small" />
          <Typography ml={"3px"}>{movieRating}</Typography>
        </Stack>
        <Box ml={3}>
          {userRating ? (
            <Button size="large" startIcon={<StarIcon color="primary" />}>
              {userRating}
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
          handleRatingChange,
          handleRatingConfirm,
          handleCloseModal,
        }}
      />
    </>
  );
}
