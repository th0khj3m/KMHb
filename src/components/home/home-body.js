import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

//MUI
import {
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Box,
} from "@mui/material";
import { Check as CheckIcon, Add as AddIcon } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { WatchlistButton, clampStyles } from "../../routes/root";

import {
  fetchPopularMovies,
  fetchTrendingMovies,
} from "../../store/movies/movies.actions";

import RatingBox from "../rating-box";
import { Img } from "../../routes/root";
import { addMovie, removeMovie } from "../../store/watchlist/watchlist.actions";
import { loadWatchlist } from "../../store/watchlist/watchlist.actions";
import useLoadWatchlist from "../../hooks/useLoadWatchlist";
import { loadRatings } from "../../store/rating/rating.actions";

const sections = [{ title: "Trending" }, { title: "Popular" }];

export default function HomeBody() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [timeframe, setTimeframe] = useState("day");
  const [movies, setMovies] = useState({
    trendingMovies: [],
    popularMovies: [],
  });

  useLoadWatchlist();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const watchlistMovies = useSelector((state) => state.watchlist.movies);
  const ratingMovies = useSelector((state) => state.rating.ratings);
  const [loadingMovie, setLoadingMovie] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trending = await dispatch(
          fetchTrendingMovies(timeframe)
        ).unwrap();
        setMovies((prevState) => ({
          ...prevState,
          trendingMovies: trending.trendingMovies,
        }));

        const popular = await dispatch(fetchPopularMovies()).unwrap();
        setMovies((prevState) => ({
          ...prevState,
          popularMovies: popular.popularMovies,
        }));

        if (isAuthenticated) {
          await dispatch(loadWatchlist());
          await dispatch(loadRatings());
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dispatch, timeframe, isAuthenticated]);

  const handleAddToWatchlist = async (movieId) => {
    // Check if the movie is already in the watchlist
    const isMovieInWatchlist = watchlistMovies.some(
      (watchlistMovie) => watchlistMovie.movie_id === movieId
    );

    // Set loading state of the specific movie to true
    setLoadingMovie((prevState) => ({
      ...prevState,
      [movieId]: true,
    }));

    try {
      if (isMovieInWatchlist) {
        await dispatch(removeMovie(movieId));
      } else {
        await dispatch(addMovie(movieId));
      }

      // Set loading state of the specific movie to false on success
      setLoadingMovie((prevState) => ({
        ...prevState,
        [movieId]: false,
      }));
    } catch (error) {
      // Set loading state of the specific movie to false on error
      setLoadingMovie((prevState) => ({
        ...prevState,
        [movieId]: false,
      }));
      console.log(error);
    }
  };

  return (
    <>
      {sections.map((section, index) => (
        <Box key={index} mt="50px" ml="35px">
          <Box display="flex" alignItems="center" mb="20px">
            <Typography variant="h4" component="h2">
              {section.title}
            </Typography>
            {index === 0 && (
              <ToggleButtonGroup
                exclusive
                value={timeframe}
                onChange={(_, newValue) => {
                  if (newValue !== null) {
                    setTimeframe(newValue);
                  }
                }}
                sx={{ ml: "20px" }}
                color="info"
              >
                <ToggleButton value="day">Day</ToggleButton>
                <ToggleButton value="week">Week</ToggleButton>
              </ToggleButtonGroup>
            )}
          </Box>

          <Box display="flex" gap="20px" overflow="auto" pb="20px" mb="20px">
            {movies[index === 0 ? "trendingMovies" : "popularMovies"].map(
              (movie, movieIndex) => (
                <Box
                  key={movieIndex}
                  display="flex"
                  flexDirection="column"
                  flexShrink={0}
                  width={"15%"}
                >
                  <Box>
                    <Link to={`/movies/${movie.id}`}>
                      <Img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        sx={{ borderRadius: "8px" }}
                      />
                    </Link>
                  </Box>

                  <RatingBox
                    movie={{
                      movieRating: Math.round(movie.vote_average * 10) / 10,
                      movieTitle: movie.title,
                      movieId: movie.id,
                      userRating: ratingMovies.find(
                        (rating) => rating.movie_id === movie.id
                      )?.rating,
                    }}
                  />

                  <Typography
                    fontWeight="bold"
                    mb="20px"
                    sx={{ ...clampStyles, flexGrow: 1 }}
                  >
                    {movie.title}
                  </Typography>
                  {isAuthenticated ? (
                    watchlistMovies.find(
                      (watchlistMovie) => watchlistMovie.movie_id === movie.id
                    ) ? (
                      <WatchlistButton
                        variant="contained"
                        onClick={() => handleAddToWatchlist(movie.id)}
                        startIcon={<CheckIcon />}
                      >
                        Watchlist
                      </WatchlistButton>
                    ) : (
                      <LoadingButton
                        onClick={() => handleAddToWatchlist(movie.id)}
                        loading={loadingMovie[movie.id]}
                        variant="contained"
                        loadingPosition="start"
                        startIcon={<AddIcon />}
                        sx={{
                          bgcolor: "#2C2C2C",
                          color: "#0DB597",
                          "&:hover": { bgcolor: "rgba(13, 181, 151, 0.4)" },
                        }}
                      >
                        <Typography component={"span"}>Watchlist</Typography>
                      </LoadingButton>
                    )
                  ) : (
                    <WatchlistButton
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => navigate("/login")}
                    >
                      Watchlist
                    </WatchlistButton>
                  )}
                </Box>
              )
            )}
          </Box>
        </Box>
      ))}
    </>
  );
}
