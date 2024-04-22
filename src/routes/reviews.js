import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  Paper,
  IconButton,
  Typography,
  Chip,
  Container,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Star, Create as CreateIcon } from "@mui/icons-material";
import ModalRender from "../components/modal-render";
import ReviewModal from "../components/modal/review-modal";
import useModal from "../hooks/useModal";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadReviews } from "../store/review/review.actions";

export default function Reviews() {
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
  });

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
            <Paper elevation={3} sx={{ mb: 4 }} key={index}>
              <Box p={"15px"}>
                <Grid container ml={"-8px"}>
                  <Grid item>
                    <IconButton>
                      <Avatar
                        alt="user-profile"
                        src=""
                        sx={{ width: 47, height: 47 }}
                      />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <Box display={"flex"} flexDirection={"column"}>
                      <Typography fontWeight={"bold"} fontSize={"20px"}>
                        {review.title}
                      </Typography>
                      <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                        <Chip
                          icon={<Star color="common.white" />}
                          label={"8.4"}
                          size="small"
                          sx={{
                            color: "white",
                            bgcolor: "#0DB597",
                            borderRadius: "6px",
                          }}
                        />
                        <Typography>Written by user on date</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                <Box>
                  <Typography component={"p"} mt={"10px"}>
                    {review.content}
                  </Typography>
                </Box>
              </Box>
            </Paper>
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
