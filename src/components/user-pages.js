import React, { useEffect, useRef } from "react";
import {
  Container,
  Box,
  Paper,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { HighlightOff } from "@mui/icons-material";
import { format } from "date-fns";
import { Img } from "../routes/root";
import RatingBox from "./rating-box";
import { useDispatch, useSelector } from "react-redux";
import { loadRatings } from "../store/rating/rating.actions";

export default function UserPage({ fetchedDataDetails, data, type }) {
  const dispatch = useDispatch();
  const ratings = useSelector((state) => state.rating.ratings);
  const typeRef = useRef(type); // Store type in a ref (Not need to trigger rerender)

  useEffect(() => {
    if ((typeRef.current = "watchlist")) {
      dispatch(loadRatings());
    }
  }, [dispatch, typeRef]);

  const title = type === "watchlist" ? "My Watchlist" : "My Ratings";

  return (
    <Container maxWidth="xl" sx={{ my: 3 }}>
      <Stack>
        <Typography variant="h4" component={"h1"} fontWeight={"bold"}>
          {title}
        </Typography>
        {data &&
          data.map((movieData) => {
            const movieId = movieData?.movie_id;
            const movie = fetchedDataDetails[movieId]?.movieDetails;
            return (
              movie && (
                <Paper
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
                          <RatingBox
                            movie={{
                              movieRating:
                                Math.round(movie?.vote_average * 10) / 10,
                              movieTitle: movie?.title,
                              movieId: movie?.id,
                              userRating:
                                type === "watchlist"
                                  ? ratings.find(
                                      (rating) => rating.movie_id === movieId
                                    )?.rating
                                  : movieData.rating,
                            }}
                          />
                        </Box>
                        <Typography fontSize={"18px"}>
                          {movie.overview}
                        </Typography>
                        <Box>
                          {type === "watchlist" && (
                            <Button
                              size="Large"
                              variant="outlined"
                              startIcon={<HighlightOff />}
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