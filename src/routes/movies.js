import React from "react";
import { Grid, Typography, Box, Paper } from "@mui/material";
import { Img } from "./root";

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

export default function Movies() {
  return (
    <Grid container mt="30px">
      <Grid item md={3}>
        <Typography></Typography>
      </Grid>
      <Grid item md={9}>
        <Box display={"flex"} flexWrap={"wrap"} justifyContent="space-between">
          {Array.from({ length: 20 }).map((_, index) => (
            <Paper
              sx={{
                flexShrink: 0,
                width: "18%",
                my: "20px",
                borderRadius: "8px",
              }}
              elevation={5}
            >
              <Img
                src={`https://image.tmdb.org/t/p/w500${testMovies[0].poster_path}`}
                sx={{ borderRadius: "8px 8px 0 0 " }}
              />
              
              <Typography p={"15px"}>{testMovies[0].title}</Typography>
            </Paper>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
}
