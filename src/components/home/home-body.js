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
import { addMovie } from "../../store/watchlist/watchlist.actions";

const sections = [{ title: "Trending" }, { title: "Popular" }];

export default function HomeBody() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [timeframe, setTimeframe] = useState("day");
  const [movies, setMovies] = useState({
    trendingMovies: [],
    popularMovies: [],
  });
  const [loadingMovie, setLoadingMovie] = useState({});
  const [successMovie, setSuccessMovie] = useState({});

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
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dispatch, timeframe]);

  const handleAddToWatchlist = async (movieId) => {
    // Set loading state of the specific movie to true
    setLoadingMovie((prevState) => ({
      ...prevState,
      [movieId]: true,
    }));

    try {
      await dispatch(addMovie(movieId));

      // Set loading state of the specific movie to false on success
      setLoadingMovie((prevState) => ({
        ...prevState,
        [movieId]: false,
      }));

      // Set success state of the specific movie to true on success
      setSuccessMovie((prevState) => ({
        ...prevState,
        [movieId]: true,
      }));
    } catch (error) {
      // Set loading state of the specific movie to false on error
      setLoadingMovie((prevState) => ({
        ...prevState,
        [movieId]: false,
      }));

      // Set success state of the specific movie to false on error
      setSuccessMovie((prevState) => ({
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
                  width="15%"
                  flexShrink={0}
                >
                  <Link to={`/movies/${movie.id}`}>
                    <Img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      sx={{ borderRadius: "8px" }}
                    />
                  </Link>

                  <RatingBox movie={movie.title} />

                  <Typography
                    fontWeight="bold"
                    mb="20px"
                    sx={{ ...clampStyles, flexGrow: 1 }}
                  >
                    {movie.title}
                  </Typography>
                  {isAuthenticated ? (
                    successMovie[movie.id] ? (
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
