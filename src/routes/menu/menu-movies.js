import React, { useEffect, useState } from "react";
import {
  Grid,
  MenuItem,
  Select,
  FormControl,
  Stack,
  Button,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme styles

import { fetchDiscoverMovies } from "../../store/movies/movies.actions";
import MovieItem from "../../components/movie-item";
import useAddToWatchlist from "../../hooks/useAddToWatchlist";

export default function MenuMovies() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("popularity.desc");
  const { handleAddToWatchlist, loadingMovie } = useAddToWatchlist();
  const [releaseDateRange, setReleaseDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { discoverMovies } = useSelector((state) => state.movies);
  const watchlistMovies = useSelector((state) => state.watchlist.movies);
  const ratingMovies = useSelector((state) => state.rating.ratings);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchDiscoverMovies());
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchDiscoverMovies({ sortBy, releaseDate: releaseDateRange }));
  };

  return (
    <Grid container my={2} spacing={3}>
      <Grid item md={3}>
        <form onSubmit={handleFormSubmit}>
          <FormControl sx={{ ml: 2 }} size="small">
            <Typography mb={1} mt={2} color={"#696969"} variant="h6">
              Sort Result By
            </Typography>
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
              <MenuItem value="release_date.asc">
                Release Date Ascending
              </MenuItem>
              <MenuItem value="vote_average.desc">Rating Descending</MenuItem>
              <MenuItem value="vote_average.asc">Rating Ascending</MenuItem>
            </Select>
            
            <Box my={2}>
              <Divider />
              <Typography mb={1} mt={2} color={"#696969"} variant="h6">
                Release Dates
              </Typography>
              <DateRange
                editableDateInputs={true} //Enable editable inputs
                onChange={(ranges) => setReleaseDateRange([ranges.selection])} //
                moveRangeOnFirstSelection={false}
                ranges={releaseDateRange}
              />
            </Box>

            <Box>
              <Button
                type="submit"
                variant="contained"
                sx={{ fontWeight: "bold", textTransform: "none" }}
                fullWidth
              >
                Search
              </Button>
            </Box>
          </FormControl>
        </form>
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
