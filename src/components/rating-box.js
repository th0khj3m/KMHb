import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import useModal from "../hooks/useModal";
import ModalRender from "./modal-render";
import RatingModal from "./modal/rating-modal";
import useRating from "../hooks/useRating";

export default function RatingBox({ movie }) {
  const { openModal, handleOpenModal, handleCloseModal } = useModal();
  const { rating, handleRating } = useRating();

  return (
    <>
      <Box display={"flex"} alignItems={"center"}>
        <StarIcon />
        <Typography ml={"3px"}>8.4</Typography>
        <IconButton onClick={() => handleOpenModal(movie)} sx={{ ml: "15px" }}>
          <StarBorderIcon />
        </IconButton>
      </Box>
      <ModalRender
        isOpen={openModal}
        handleClose={handleCloseModal}
        Component={RatingModal}
        modalProps={{
          rating,
          handleRating,
        }}
      />
    </>
  );
}
