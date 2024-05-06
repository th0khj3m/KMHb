import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Typography,
  Box,
  Grid,
  Paper,
  Divider,
  Container,
  Stack,
} from "@mui/material";

import { Img } from "../../routes/root";
import { loadReviews } from "../../store/review/review.actions";
import ReviewCard from "../review-card";

export default function MovieDetailsInfo({ movie }) {
  const dispatch = useDispatch();

  const { reviews } = useSelector((state) => state.review);
  const { casts } = movie;

  useEffect(() => {
    if (movie && movie.id) {
      const fetchReviews = async () => {
        try {
          await dispatch(loadReviews(movie.id));
        } catch (err) {
          console.log(err);
        }
      };
      fetchReviews();
    }
  }, [dispatch, movie, movie.id]);

  // Correctly handle rendering when reviews might be empty
  const firstReview = reviews.length > 0 ? reviews[0] : null;

  return (
    <Container maxWidth="xl">
      <Grid container spacing={10} pt={"30px"}>
        <Grid item md={8}>
          <Box>
            <Typography variant="h5" fontWeight="600" mb="15px" component="h2">
              Top billed cast
            </Typography>
            <Box display="flex" gap="15px" overflow="auto" mb={2}>
              {casts &&
                casts.cast?.map((cast, index) => (
                  <Paper
                    elevation={3}
                    key={index}
                    sx={{
                      width: "20%",
                      borderRadius: "6px",
                      mb: "20px",
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: "0",
                      flexShrink: "0",
                      flexBasis: "auto",
                    }}
                  >
                    <Link to={`/casts/${cast.id}`}>
                      <Img
                        src={`https://image.tmdb.org/t/p/w500${cast?.profile_path}`}
                        alt={`${cast?.name}`}
                      />
                    </Link>
                    <Box p="10px">
                      <Typography sx={{ fontWeight: "bold" }}>
                        {cast?.name}
                      </Typography>
                      <Typography>{cast?.character}</Typography>
                    </Box>
                  </Paper>
                ))}
            </Box>
          </Box>

          <Divider />

          <Stack my={1} gap={1}>
            <Typography variant="h5" component="h2" fontWeight={"600"}>
              User reviews
            </Typography>
            {firstReview ? (
              <ReviewCard review={firstReview} />
            ) : (
              <Typography>
                {" "}
                We don't have any reviews for {movie.title}
              </Typography>
            )}
            <Link
              to={`/movies/${movie.id}/reviews`}
              style={{ textDecoration: "none" }}
            >
              <Typography color="black" fontWeight={"600"} mb={2}>
                Read all reviews
              </Typography>
            </Link>
          </Stack>
        </Grid>
        <Grid item md={3} m={1}>
          {movie && (
            <Box display="flex" flexDirection="column" gap="10px">
              <Typography variant="h5" component="h2" fontWeight="bold">
                Details
              </Typography>
              <Box>
                <Typography fontWeight="bold">Release date</Typography>
                <Typography variant="details_info">
                  {movie?.release_date}
                </Typography>
              </Box>
              <Divider />
              <Box>
                <Typography fontWeight="bold">Original Language</Typography>
                <Typography variant="details_info">
                  {movie?.original_language}
                </Typography>
              </Box>
              <Divider />
              <Box>
                <Typography fontWeight="bold">Budget</Typography>
                <Typography variant="details_info">
                  ${movie?.budget?.toLocaleString()}
                </Typography>
              </Box>
              <Divider />
              <Box>
                <Typography fontWeight="bold">Revenue</Typography>
                <Typography variant="details_info">
                  ${movie?.revenue?.toLocaleString()}
                </Typography>
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
