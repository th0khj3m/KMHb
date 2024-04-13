import React from "react";
import {
  Container,
  Typography,
  Divider,
  Grid,
  Box,
  Rating,
  Modal,
  Paper,
  TextField
} from "@mui/material";

import { Form, Formik, Field } from "formik";

import { Img } from "../../routes/root";

const testMovies = [
  {
    adult: false,
    backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    genre_ids: [878, 12],
    id: 693134,
    original_language: "en",
    original_title: "Dune: Part Two",
    overview:
      "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
    popularity: 4651.845,
    poster_path: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    release_date: "2024-02-27",
    title: "Dune: Part Two",
    video: false,
    vote_average: 8.317,
    vote_count: 2670,
  },
];

export default function ReviewModal({ isOpen, handleClose, modalMovieIndex }) {
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Container maxWidth="sm">
        <Paper elevation={4} sx={{ borderRadius: "10px" }}>
          <Grid container sx={{bgcolor:"#f3f3f3"}}>
            <Grid item md={2}>
              <Img
                src={`https://image.tmdb.org/t/p/w500${testMovies[0].poster_path}`}
              />
            </Grid>
            <Grid item md={10}>
              <Box>
                <Typography> Dune: Part Two (2024) </Typography>
                <Divider sx={{bgcolor:"main"}}/>
                <Typography variant="h2" component={"h1"}>
                  Add an Item
                </Typography>
              </Box>
            </Grid>
            <Divider />
            <Typography>YOUR RATING</Typography>
          </Grid>
          <Rating
            name="rating"
            max={10}
            precision={1}
            size="large"
            // onChange={handleRating}
            sx={{ marginBottom: "15px", color: "main" }}
          />
          <Box>
            <Typography bgcolor={"#f3f3f3"}>YOUR REVIEW</Typography>
            
          </Box>
        </Paper>
      </Container>
    </Modal>
  );
}
