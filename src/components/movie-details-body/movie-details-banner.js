import React from "react";
import {
  Typography,
  Divider,
  Chip,
  Box,
  Grid,
  Container,
  Stack,
} from "@mui/material";
import { WhiteTypography } from "../../routes/root";
import StarIcon from "@mui/icons-material/Star";
import RatingBox from "../rating-box";
import { useSelector } from "react-redux";

export default function MovieDetailsBanner({ movie }) {
  const ratingMovies = useSelector((state) => state.rating.ratings);
  const movieYear = movie?.release_date?.split("-")[0];
  const hours = Math.floor(movie.runtime / 60) ?? 0;
  const minutes = movie?.runtime % 60 ?? 0;
  const usRelease = movie?.releaseDates?.results.find(
    (result) => result.iso_3166_1 === "US"
  );
  const movieCertification =
    usRelease?.release_dates[0]?.certification !== undefined &&
    usRelease?.release_dates[0]?.certification !== ""
      ? usRelease.release_dates[0].certification
      : "PG";
  const movieRating = movie?.vote_average.toFixed(1);
  const movieKey = movie?.newestTrailer?.key;

  const getDirector = () => {
    if (movie && movie.casts && movie.casts.crew) {
      const director = movie.casts.crew.find(
        (crewMember) =>
          crewMember.department === "Directing" && crewMember.job === "Director"
      );
      return director ? director.name : "";
    }
    return "Director Not Found";
  };

  // Function to get the writers of the movie
  const getWriters = () => {
    if (movie && movie.casts && movie.casts.crew) {
      const writers = movie.casts.crew.filter(
        (crewMember) => crewMember.department === "Writing"
      );
      return writers.length > 0
        ? writers.map((writer) => writer.name).join(" · ")
        : "";
    }
    return "Writers Not Found";
  };

  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 1,
      }}
    >
      <Container maxWidth="xl">
        <Box display={"flex"} mb={"15px"}>
          <Box mt="30px">
            <WhiteTypography variant="h2" component="h1" fontWeight={"bold"}>
              {movie?.title ?? "Movie Title"}
            </WhiteTypography>
            {movieYear && hours && minutes && (
              <WhiteTypography sx={{ color: "common.white" }}>
                {movieYear} | {movieCertification} | {hours} hours {minutes}{" "}
                minutes
              </WhiteTypography>
            )}
          </Box>
          <Box
            sx={{
              ml: "auto",
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
                <Stack direction={"row"} spacing={2}>
                  <WhiteTypography>KMHb RATING</WhiteTypography>
                  <Box display="flex" justifyContent="center">
                    <StarIcon sx={{ color: "main" }} />
                    <WhiteTypography ml="3px">{movieRating}</WhiteTypography>
                  </Box>
                </Stack>
              </Grid>
              <Grid item md={6} sx={{ textAlign: "center" }}>
                {movie && (
                  <RatingBox
                    movie={{
                      movieRating: Math.round(movie.vote_average * 10) / 10,
                      movieTitle: movie.title,
                      movieId: movie.id,
                      userRating: ratingMovies.find(
                        (rating) => rating.movie_id === movie.id
                      )?.rating,
                    }}
                    size="large"
                    cut={true}
                  />
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box display={"flex"}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie?.title}
            width="20%"
          />
          {movieKey && (
            <iframe
              src={`https://www.youtube.com/embed/${movieKey}`}
              title={movie?.title}
              style={{ flex: 1 }}
            />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: "15px",
            gap: "10px",
          }}
        >
          <Box>
            {movie.genres &&
              movie.genres.map((genre, index) => (
                <Chip
                  key={index}
                  label={genre.name}
                  clickable
                  sx={{
                    marginRight: "5px",
                    color: "#fff",
                    border: "1px solid #fff",
                    bgcolor: "transparent",
                  }}
                />
              ))}
          </Box>
          <WhiteTypography sx={{ my: "10px" }}>
            {movie?.overview}
          </WhiteTypography>
          <Divider />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <WhiteTypography variant="h6" gutterBottom mb={"auto"} mr={"15px"}>
              Director
            </WhiteTypography>
            <Typography variant="h6" color={"main"}>
              {getDirector()}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ display: "flex", alignItems: "center", mb: "20px" }}>
            <WhiteTypography variant="h6" gutterBottom mb={"auto"} mr={"15px"}>
              Writers
            </WhiteTypography>
            <Typography variant="h6" color={"main"}>
              {getWriters()}
            </Typography>
          </Box>
        </Box>
      </Container>

      <Box
        sx={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1, // Set background image z-index lower
        }}
      >
        <Box
          sx={{
            position: "absolute", // Ensures overlay stays on top
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
        />
      </Box>
    </Box>
  );
}
