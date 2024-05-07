import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Container,
  Box,
  Paper,
  Stack,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { HighlightOff, ArrowUpward, ArrowDownward } from "@mui/icons-material";

import { format } from "date-fns";
import { Img } from "../routes/root";
import RatingBox from "./rating-box";
import { removeMovie } from "../store/watchlist/watchlist.actions";

import useFilterAndSort from "../hooks/useFilterAndSort";
import filterAndSort from "../utils/filter-and-sort";

export default function UserPage({ data, fetchedDataDetails, type }) {
  const dispatch = useDispatch();
  const { ratings } = useSelector((state) => state.rating);
  const { filterBy, sortBy, handleFilterChange, handleSortToggle } =
    useFilterAndSort();

  const title = type === "watchlist" ? "My Watchlist" : "My Ratings";

  const handleRemoveFromWatchlist = (movieId) => {
    dispatch(removeMovie(movieId));
  };


  const filteredAndSortedData = filterAndSort(
    data,
    ratings,
    fetchedDataDetails,
    filterBy,
    sortBy
  );

  return (
    <Container maxWidth="xl" sx={{ my: 3 }}>
      <Stack>
        <Grid container>
          <Grid item md={6}>
            <Typography variant="h4" component={"h1"} fontWeight={"bold"}>
              {title}
            </Typography>
          </Grid>
          <Grid item md={6} display={"inline-flex"} alignItems={"center"}>
            <Typography fontSize={18}>Sort by:</Typography>
            <FormControl sx={{ ml: 2, minWidth: 200 }} size="small">
              <Select
                id="watchlist-options-select"
                value={filterBy}
                onChange={handleFilterChange}
              >
                <MenuItem value="date_added">Date Added</MenuItem>
                <MenuItem value="movie_rating">KMHb Rating</MenuItem>
                <MenuItem value="user_rating">Your Rating</MenuItem>
                <MenuItem value="release_date">Release Date</MenuItem>
              </Select>
            </FormControl>
            <IconButton onClick={handleSortToggle}>
              {sortBy === "asc" ? <ArrowUpward /> : <ArrowDownward />}
            </IconButton>
          </Grid>
        </Grid>

        {filteredAndSortedData &&
          filteredAndSortedData.map((movieData, index) => {
            const movieId = movieData?.movie_id;
            const movie = fetchedDataDetails[movieId];
            return (
              movie && (
                <Paper
                  key={index}
                  elevation={2}
                  sx={{
                    borderRadius: "9px",
                    mt: 3,
                    borderTop: "1px solid #eaeaea",
                    borderLeft: "1px solid #eaeaea",
                    borderRight: "1px solid #eaeaea",
                  }}
                >
                  <Grid container spacing={6} width={"100%"}>
                    <Grid item md={2}>
                      <Box>
                        <Img
                          src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                          sx={{
                            borderRadius: "8px 0 0 8px",
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid display={"flex"} item md={10} alignItems={"center"}>
                      <Stack spacing={2}>
                        <Box>
                          <Typography
                            variant="h5"
                            fontWeight={"bold"}
                            component={"h2"}
                          >
                            {movie?.title}
                          </Typography>
                          <Typography color={"#66667D"}>
                            {format(
                              new Date(movie?.release_date),
                              "MMMM d, yyyy"
                            )}
                          </Typography>
                          <RatingBox movie={movie} />
                        </Box>
                        <Typography fontSize={"18px"}>
                          {movie?.overview}
                        </Typography>
                        <Box>
                          {type === "watchlist" && (
                            <Button
                              size="Large"
                              variant="outlined"
                              startIcon={<HighlightOff />}
                              onClick={() =>
                                handleRemoveFromWatchlist(movie.id)
                              }
                            >
                              Remove
                            </Button>
                          )}
                        </Box>
                      </Stack>
                    </Grid>
                  </Grid>
                </Paper>
              )
            );
          })}
      </Stack>
    </Container>
  );
}
