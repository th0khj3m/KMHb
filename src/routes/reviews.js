import React from "react";
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
import { useSelector } from "react-redux";

const testMovie = {
  adult: false,
  backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
  id: 693134,
  title: "Dune: Part Two",
  original_language: "en",
  original_title: "Dune: Part Two",
  overview:
    "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
  poster_path: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
  budget: 190000000,
  media_type: "movie",
  popularity: 986.406,
  revenue: 660000000,
  runtime: 167,
  status: "Released",
  release_date: "2024-02-27",
  video: false,
  vote_average: 8.359,
  vote_count: 2466,
  key: "6czYOLR3tBg",
  genres: [
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 12,
      name: "Adventure",
    },
  ],
  casts: {
    cast: [
      {
        adult: false,
        gender: 2,
        id: 1190668,
        known_for_department: "Acting",
        name: "Timothée Chalamet",
        original_name: "Timothée Chalamet",
        popularity: 125.345,
        profile_path: "/BE2sdjpgsa2rNTFa66f7upkaOP.jpg",
        cast_id: 2,
        character: "Paul Atreides",
        credit_id: "5e959c45955c6500159f1c98",
        order: 0,
      },
    ],
  },
};

export default function Reviews() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { movieId } = useParams();
  const { openModal, handleOpenModal, handleCloseModal, modalIndex } =
    useModal();

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
          {Array.from({ length: 4 }).map((index) => (
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
                        Title
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
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
            handleCloseModal
          }}
        />
      )}
    </Container>
  );
}
