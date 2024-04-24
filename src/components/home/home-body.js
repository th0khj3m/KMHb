import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//MUI
import {
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Box,
} from "@mui/material";

import {
  fetchPopularMovies,
  fetchTrendingMovies,
} from "../../store/movies/movies.actions";

import MovieItem from "../movie-item";
import useAddToWatchlist from "../../hooks/useAddToWatchlist";

const sections = [{ title: "Trending" }, { title: "Popular" }];

export default function HomeBody() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const watchlistMovies = useSelector((state) => state.watchlist.movies);
  const ratingMovies = useSelector((state) => state.rating.ratings);
  const { handleAddToWatchlist, loadingMovie } = useAddToWatchlist();

  const [timeframe, setTimeframe] = useState("day");
  const [movies, setMovies] = useState({
    trendingMovies: [],
    popularMovies: [],
  });

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
  }, [dispatch, timeframe, isAuthenticated]);

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
            {movies &&
              movies[index === 0 ? "trendingMovies" : "popularMovies"].map(
                (movie, index) => (
                  <MovieItem
                    key={index}
                    movie={movie}
                    movieIndex={index}
                    isAuthenticated={isAuthenticated}
                    watchlistMovies={watchlistMovies}
                    ratingMovies={ratingMovies}
                    loadingMovie={loadingMovie}
                    handleAddToWatchlist={handleAddToWatchlist}
                    navigate={navigate}
                  />
                )
              )}
          </Box>
        </Box>
      ))}
    </>
  );
}
