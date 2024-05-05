import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Button, Box, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
  PlayCircleOutline,
} from "@mui/icons-material";

import {
  fetchUpcomingMovies,
  fetchNewestTrailer,
} from "../../store/movies/movies.actions.js";
import { Img } from "../../routes/root.js";
import VideoModal from "../modal/video-modal.js";
import useModal from "../../hooks/useModal.js";
import ModalRender from "../modal-render.js";
import { MovieOverview, PlayButton, ArrowButton } from "../../routes/root.js";

export default function HomeBanner() {
  const dispatch = useDispatch();
  const { upcomingMovies } = useSelector((state) => state.movies);
  const upcomingMoviesArray = Object.values(upcomingMovies);

  const [currentIndex, setCurrentIndex] = useState(0);
  const { openModal, modalIndex, handleOpenModal, handleCloseModal } =
    useModal();

  // Fetch data when the component mounts
  useEffect(() => {
    dispatch(fetchUpcomingMovies());
  }, [dispatch]);

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
      return (prevIndex + 1) % upcomingMoviesArray.length;
    });
  };

  const handleBack = () => {
    setCurrentIndex((prevIndex) => {
      // Decrement index, loop back to last in
      return (
        (prevIndex - 1 + upcomingMoviesArray.length) %
        upcomingMoviesArray.length
      );
    });
  };

  const handleOpenTrailer = async (movieIndex) => {
    const movieId = upcomingMoviesArray[movieIndex].id;
    await dispatch(fetchNewestTrailer(movieId));
    handleOpenModal(movieId);
  };

  return (
    <Grid container>
      <Grid item md={8}>
        {upcomingMoviesArray.length > 0 && (
          <Box position={"relative"}>
            <Img
              src={
                getBackdropAndPoster(upcomingMoviesArray[currentIndex]).backdrop
              }
              alt={upcomingMoviesArray[currentIndex].title}
              onClick={() => handleOpenTrailer(currentIndex)}
              sx={{
                cursor: "pointer",
                pointerEvents: "auto",
              }}
            />
            <Img
              src={
                getBackdropAndPoster(upcomingMoviesArray[currentIndex]).poster
              }
              alt={upcomingMoviesArray[currentIndex].title}
              sx={{
                position: "absolute",
                bottom: "10%",
                transform: "translate(20%, 50%)",
                width: "20%",
                zIndex: 1,
              }}
            />
            <Box sx={{ display: "flex", width: "74%", float: "right" }}>
              <IconButton
                sx={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  p: 0,
                }}
                onClick={() => handleOpenTrailer(currentIndex)}
              >
                <PlayButton sx={{ fontSize: "96px" }} />
              </IconButton>

              <Box sx={{ ml: 2, mt: 1 }}>
                <Typography variant="h4">
                  {upcomingMoviesArray[currentIndex].title}
                </Typography>
                <MovieOverview>
                  {upcomingMoviesArray[currentIndex].overview}
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
          {upcomingMoviesArray.length > 0 &&
            Array.from({ length: 3 }).map((_, index) => {
              const movieIndex =
                (currentIndex + index + 1) % upcomingMoviesArray.length;
              const movie = upcomingMoviesArray[movieIndex];
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
                        onClick={() => handleOpenTrailer(movieIndex)}
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
        {upcomingMovies && modalIndex && (
          <ModalRender
            isOpen={openModal}
            handleClose={handleCloseModal}
            Component={VideoModal}
            modalProps={{
              videoKey: upcomingMovies[modalIndex].video.key,
              videoName: upcomingMovies[modalIndex].video.name,
              handleCloseModal,
            }}
          />
        )}
      </Grid>
    </Grid>
  );
}
