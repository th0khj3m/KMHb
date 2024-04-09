import React from "react";
import { Divider, Typography, Chip, Box, Grid } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { StarBorder } from "@mui/icons-material";

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
  media_type: "movie",
  genre_ids: [878, 12],
  popularity: 986.406,
  release_date: "2024-02-27",
  video: false,
  vote_average: 8.359,
  vote_count: 2466,
  key: "6czYOLR3tBg",
  genres: [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
  ],
};

export default function MovieDetailsBanner() {
  return (
    <Box className="movie-details-banner">
      <Box
        className="movie-details-header"
        sx={{ margin: "15px", display: "flex" }}
      >
        <Box>
          <Typography variant="h2" component="h1">
            Lmao
          </Typography>
          <Typography>Year | Certification | Duration</Typography>
        </Box>
        <Box
          sx={{
            marginLeft: "auto",
            width: "30%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid container>
            <Grid
              item
              md={6}
              sx={{
                textAlign: "center",
                margin: "auto",
              }}
            >
              <Typography>KMHb RATING</Typography>
              <Box display="flex" justifyContent="center">
                <StarIcon />
                <Typography>10/10</Typography>
              </Box>
            </Grid>
            <Grid item md={6} sx={{ textAlign: "center" }}>
              <Typography>YOUR RATING</Typography>
              <Box display="flex" justifyContent="center">
                <StarBorder />
                <Typography>9.2/10</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box
        className="movie-details-content"
        sx={{ display: "flex", margin: "15px" }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${testMovie.poster_path}`}
          alt="hehe"
          width="20%"
        />
        <iframe
          src={`https://www.youtube.com/embed/${testMovie.key}`}
          className="trailer-container"
          title="hehe"
          style={{ flex: 1 }}
        />
        <Box className="media-gallery">
          <Box
            className="video-gallery"
            sx={{
              height: "200px",
              width: "200px",
              backgroundColor: "blue",
              borderLeft: "5px solid white",
              marginBottom: "5px",
            }}
          ></Box>
          <Box
            className="photo-gallery"
            sx={{
              height: "200px",
              width: "200px",
              backgroundColor: "blue",
              borderLeft: "5px solid white",
            }}
          ></Box>
        </Box>
      </Box>
      <Box
        className="movie-details-info"
        sx={{ margin: "15px", display: "flex", flexDirection: "column" }}
      >
        <Box sx={{ marginBottom: "10px" }}>
          {testMovie.genres.map((genre, index) => (
            <Chip
              key={index}
              label={genre.name}
              clickable
              sx={{ marginRight: "5px" }}
            />
          ))}
        </Box>
        <Typography style={{ marginTop: "10px" }}>
          {testMovie.overview}
        </Typography>
        <Divider />
        <Box
          className="director"
          sx={{ display: "flex", alignItems: "center", margin: "10px 0" }}
        >
          <Typography
            variant="h6"
            gutterBottom
            style={{ marginBottom: "auto", marginRight: "15px" }}
          >
            Director
          </Typography>
          <Typography>Director's name</Typography>
        </Box>
        <Divider />
        <Box
          className="writer"
          sx={{ display: "flex", alignItems: "center", margin: "10px 0" }}
        >
          <Typography
            variant="h6"
            gutterBottom
            style={{ marginBottom: "auto", marginRight: "15px" }}
          >
            Writers
          </Typography>
          <Typography>Writer's name</Typography>
        </Box>
      </Box>
    </Box>
  );
}
