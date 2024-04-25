import React, { useEffect } from "react";
import { Grid, Button, Container } from "@mui/material";
import { Create as CreateIcon } from "@mui/icons-material";
import ModalRender from "../components/modal-render";
import ReviewModal from "../components/modal/review-modal";
import useModal from "../hooks/useModal";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadReviews } from "../store/review/review.actions";
import ReviewCard from "../components/review-card";

export default function MovieReviews() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const reviews = useSelector((state) => state.review.reviews);

  const { openModal, handleOpenModal, handleCloseModal, modalIndex } =
    useModal();

  useEffect(() => {
    try {
      dispatch(loadReviews(movieId));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, movieId]);

  const handleClick = () => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login if not authenticated
      return; // Prevent further execution for non-authenticated users
    }
    handleOpenModal(movieId); // Open modal for authenticated users
  };

  return (
    <Container maxWidth="xl">
      <Grid container mt={4}>
        <Grid item md={3} textAlign={"center"}>
          <Button
            variant="contained"
            startIcon={<CreateIcon />}
            onClick={handleClick}
            sx={{
              bgcolor: "black",
              fontWeight: "bold",
              borderRadius: "20px",
              color: "main",
              "&:hover": {
                bgcolor: "#333",
              },
            }}
          >
            WRITE REVIEW
          </Button>
        </Grid>
        <Grid item md={9}>
          {reviews.map((review, index) => (
            <ReviewCard review={review} />
          ))}
        </Grid>
      </Grid>
      {openModal && (
        <ModalRender
          isOpen={openModal}
          handleClose={handleCloseModal}
          Component={ReviewModal}
          modalProps={{
            movieId: modalIndex,
            handleCloseModal,
          }}
        />
      )}
    </Container>
  );
}
