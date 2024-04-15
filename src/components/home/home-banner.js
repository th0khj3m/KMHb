import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Button, Box, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
  PlayCircleOutline,
} from "@mui/icons-material";
import { Img } from "../../routes/root.js";

import { fetchUpcomingMovies } from "../../store/movies/movies.actions.js";
import { fetchNewestTrailer } from "../../store/video/video.actions.js";
import { selectUpcomingMovies } from "../../store/movies/movies.reducers.js";

import VideoModal from "../modal/video-modal.js";

export default function HomeBanner() {
  const MovieOverview = styled(Typography)({
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    color: "#666", // Use a lighter shade of black
  });

  const PlayButton = styled(PlayCircleOutline)(({ theme }) => ({
    color: "black",
    "&:hover": {
      color: theme.palette.main,
    },
  }));

  const ArrowButton = styled(IconButton)({
    position: "absolute",
    top: "45%",
    transform: "translateY(-70%)",
    backgroundColor: "#3A3E29",
    opacity: 0.5,
    border: "1px solid white",
  });

  const dispatch = useDispatch();
  const upcomingMovies = Object.values(useSelector(selectUpcomingMovies));

  // Store trailers for each movie in a map
  const [trailers, setTrailers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalMovieIndex, setModalMovieIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  // Fetch data when the component mounts
  useEffect(() => {
    dispatch(fetchUpcomingMovies()).unwrap();
  }, [dispatch]);

  // Function to fetch the newest trailer for a movie
  const fetchTrailer = async (movieId) => {
    const response = await dispatch(fetchNewestTrailer(movieId)).unwrap();
    setTrailers((prevTrailers) => ({
      ...prevTrailers,
      [movieId]: response.video,
    }));
  };

  // Function to get the backdrop and poster path for a movie
  const getBackdropAndPoster = (movie) => {
    if (movie.backdrop_path && movie.poster_path) {
      return {
        backdrop: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      };
    }
    return null;
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      // Increment index, loop back to 0 if reaching the end
      return (prevIndex + 1) % upcomingMovies.length;
    });
  };

  const handleBack = () => {
    setCurrentIndex((prevIndex) => {
      // Decrement index, loop back to last in
      return (prevIndex - 1 + upcomingMovies.length) % upcomingMovies.length;
    });
  };

  const handleOpenModal = async (movieIndex) => {
    const movieId = upcomingMovies[movieIndex].id;
    if (!trailers[movieId]) {
      await fetchTrailer(movieId);
    }
    setModalMovieIndex(movieIndex);
    setOpenModal(true);
  };

  return (
    <Grid container>
      <Grid item md={8}>
        {upcomingMovies.length > 0 && (
          <Box position={"relative"}>
            <Img
              src={getBackdropAndPoster(upcomingMovies[currentIndex]).backdrop}
              alt={upcomingMovies[currentIndex].title}
              onClick={() => handleOpenModal(currentIndex)}
              sx={{
                cursor: "pointer",
                pointerEvents: "auto",
              }}
            />
            <Img
              src={getBackdropAndPoster(upcomingMovies[currentIndex]).poster}
              alt={upcomingMovies[currentIndex].title}
              sx={{
                position: "absolute",
                bottom: "10%",
                transform: "translate(20%, 50%)",
                width: "20%",
                zIndex: 1,
              }}
            />
            <Box sx={{ display: "flex", width: "74%", float: "right" }}>
              <Button
                sx={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  p: 0,
                }}
                onClick={() => handleOpenModal(currentIndex)}
              >
                <PlayButton sx={{ fontSize: "96px" }} />
              </Button>

              <Box sx={{ ml: 2, mt: 1 }}>
                <Typography variant="h4">
                  {upcomingMovies[currentIndex].title}
                </Typography>
                <MovieOverview>
                  {upcomingMovies[currentIndex].overview}
                </MovieOverview>
              </Box>
            </Box>

            <ArrowButton
              onClick={handleBack}
              sx={{
                left: "10px",
              }}
            >
              <ArrowBackIosNew sx={{ color: "white" }} />
            </ArrowButton>

            <ArrowButton
              className="next-button"
              onClick={handleNext}
              sx={{
                right: "10px",
              }}
            >
              <ArrowForwardIos sx={{ color: "white" }} />
            </ArrowButton>
          </Box>
        )}
      </Grid>

      <Grid item md={4}>
        <Typography
          variant="h2"
          sx={{
            color: "#00E5C6",
            fontWeight: "bold",
            fontSize: "1.5em",
            ml: 1,
            mt: 1,
          }}
        >
          Up next
        </Typography>
        <Box
          sx={{
            background: "linear-gradient(to bottom, #D9D9D9, #FFFFFF)",
            ml: 1,
            mt: 1,
          }}
        >
          {upcomingMovies.length > 0 &&
            Array.from({ length: 3 }).map((_, index) => {
              const movieIndex =
                (currentIndex + index + 1) % upcomingMovies.length;
              const movie = upcomingMovies[movieIndex];
              return (
                <Grid container key={movie.id} p="10px">
                  <Grid item md={3}>
                    <Img
                      src={getBackdropAndPoster(movie).poster}
                      alt={movie.title}
                    />
                  </Grid>
                  <Grid item md={9}>
                    <Box
                      pl="15px"
                      display={"flex"}
                      flexDirection={"column"}
                      alignItems={"start"}
                      ml={"auto"}
                    >
                      <Button
                        className="play-button"
                        onClick={() => handleOpenModal(movieIndex)}
                        sx={{
                          background: "none",
                          cursor: "pointer",
                          p: 0,
                        }}
                      >
                        <PlayButton fontSize="large" sx={{ mr: "auto" }} />
                      </Button>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 500,
                          display: "block",
                          fontSize: "large",
                        }}
                      >
                        {movie.title}
                      </Typography>
                      <MovieOverview>{movie.overview}</MovieOverview>
                    </Box>
                  </Grid>
                </Grid>
              );
            })}
        </Box>
        <VideoModal
          open={openModal}
          handleClose={() => setOpenModal(false)}
          videoKey={trailers[upcomingMovies[modalMovieIndex]?.id]?.key} // Pass the selected movie's trailer key
          videoName={trailers[upcomingMovies[modalMovieIndex]?.id]?.name} // Pass the selected movie's trailer name
        />
      </Grid>
    </Grid>
  );
}
