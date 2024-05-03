import React, { useEffect, useState } from "react";
import { Grid, MenuItem, Select, FormControl, Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchDiscoverMovies } from "../../store/movies/movies.actions";
import MovieItem from "../../components/movie-item";
import useAddToWatchlist from "../../hooks/useAddToWatchlist";

export default function MenuMovies() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("popularity.desc");

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { discoverMovies } = useSelector((state) => state.movies);
  const watchlistMovies = useSelector((state) => state.watchlist.movies);
  const ratingMovies = useSelector((state) => state.rating.ratings);

  const { handleAddToWatchlist, loadingMovie } = useAddToWatchlist();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchDiscoverMovies(sortBy));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [dispatch, sortBy]);

  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <Grid container my={2} spacing={3}>
      <Grid item md={3}>
        <FormControl sx={{ ml: 2 }}>
          <Select
            id="menu-movies-select"
            value={sortBy}
            onChange={handleChange}
          >
            <MenuItem value="popularity.desc">Popularity Descending</MenuItem>
            <MenuItem value="popularity.asc">Popularity Ascending</MenuItem>
            <MenuItem value="release_date.desc">
              Release Date Descending
            </MenuItem>
            <MenuItem value="release_date.asc">Release Date Ascending</MenuItem>
            <MenuItem value="vote_average.desc">Rating Descending</MenuItem>
            <MenuItem value="vote_average.asc">Rating Ascending</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={9}>
        <Stack direction={"row"} useFlexGap flexWrap={"wrap"} spacing={2}>
          {discoverMovies &&
            Object.values(discoverMovies).map((movie, index) => (
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
                movieWidth="23%"
              />
            ))}
        </Stack>
      </Grid>
    </Grid>
  );
}
