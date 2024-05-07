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
import {
  Add as AddIcon,
  Star as StarIcon,
  Check as CheckIcon,
} from "@mui/icons-material";

import { BannerWatchlistButton, Img, WhiteTypography } from "../../routes/root";
import RatingBox from "../rating-box";
import findNewestTrailer from "../../utils/find-newest-trailer";
import useIsInWatchlist from "../../hooks/useIsInWatchlist";
import useWatchlistManagement from "../../hooks/useWatchlistManagement";

export default function MovieDetailsBanner({ movie }) {
  const movieYear = movie?.release_date?.split("-")[0];
  const hours = Math.floor(movie.runtime / 60) ?? 0;
  const minutes = movie?.runtime % 60 ?? 0;
  const usRelease = movie?.release_dates?.results.find(
    (result) => result.iso_3166_1 === "US"
  );
  const movieCertification =
    usRelease?.release_dates[0]?.certification !== undefined &&
    usRelease?.release_dates[0]?.certification !== ""
      ? usRelease.release_dates[0].certification
      : "PG";
  const movieRating = movie?.vote_average?.toFixed(1);

  const newestTrailer = findNewestTrailer(movie?.videos?.results);
  const movieKey = newestTrailer?.key;
  const movieImagePath = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `/images/no-image.png`;

  const isMovieInWatchlist = useIsInWatchlist(movie.id);
  const { handleWatchlistManagement } = useWatchlistManagement(movie.id);

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
                {movie && <RatingBox movie={movie} size="large" cut={true} />}
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box display={"flex"}>
          <Img src={movieImagePath} alt={movie?.title} width="20%" />
          {movieKey ? (
            <Box
              component={"iframe"}
              src={`https://www.youtube.com/embed/${movieKey}`}
              title={movie?.title}
              flex={1}
              allowFullScreen
            />
          ) : (
            <Box
              component={"iframe"}
              src={`/videos/no-trailer.mp4`}
              title={movie?.title}
              flex={1}
              allowFullScreen
              sx={{ bgcolor: "black" }}
            />
          )}
        </Box>
        <Grid container>
          <Grid item md={9} my={2}>
            <Stack gap={1}>
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
              <WhiteTypography my={1}>{movie?.overview}</WhiteTypography>
              <Divider />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <WhiteTypography
                  gutterBottom
                  mb={"auto"}
                  mr={"15px"}
                  fontWeight={"bold"}
                >
                  Director
                </WhiteTypography>
                <Typography color={"main"}>{getDirector()}</Typography>
              </Box>
              <Divider />
              <Box sx={{ display: "flex", alignItems: "center", mb: "20px" }}>
                <WhiteTypography
                  gutterBottom
                  mb={"auto"}
                  mr={1}
                  fontWeight={"bold"}
                >
                  Writers
                </WhiteTypography>
                <Typography color={"main"}>{getWriters()}</Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid
            item
            md={3}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <BannerWatchlistButton
              variant="contained"
              onClick={() => handleWatchlistManagement()}
              startIcon={isMovieInWatchlist ? <CheckIcon /> : <AddIcon />}
              size="large"
            >
              <Typography fontWeight={"bold"} width={"100%"}>
                Add to Watchlist
              </Typography>
            </BannerWatchlistButton>
          </Grid>
        </Grid>
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
