import React from "react";
import {
  Typography,
  Box,
  Grid,
  Paper,
  Divider,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Img } from "../../routes/root";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadReviews } from "../../store/review/review.actions";

export default function MovieDetailsInfo({ movie }) {
  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state.review);
  const review = reviews[0];
  const releaseDate = new Date(review?.review_date);
  const formattedReviewDate = releaseDate?.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const { casts } = movie;
  useEffect(() => {
    try {
      const fetchReviews = async () => {
        await dispatch(loadReviews(movie.id));
      };
      fetchReviews();
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, movie.id]);

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

          <Box my="15px">
            <Typography variant="h5" component="h2" fontWeight={"600"}>
              User reviews
            </Typography>
            {reviews.length > 0 && (
              <Paper
                elevation={3}
                sx={{
                  display: "flex",
                  gap: "10px",
                  flexDirection: "column",
                  my: "15px",
                }}
              >
                <Box my="15px" ml="15px">
                  <Typography fontWeight={"600"}>{review.review_title}</Typography>
                  <Box display={"flex"} mb={"15px"} alignItems={"center"}>
                    <Typography>
                      Written by{" "}
                      <Typography variant="span" fontWeight={"bold"} mr={0.6}>
                        {review.user_username}
                      </Typography>
                      on {formattedReviewDate}
                    </Typography>
                  </Box>
                  <Typography>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: review.review_content,
                      }}
                    />
                    {/* <Link>read the rest.</Link> */}
                  </Typography>
                </Box>
              </Paper>
            )}

            <Link
              to={`/movies/${movie.id}/reviews`}
              style={{ textDecoration: "none" }}
            >
              <Typography color="black" fontWeight={"600"}>
                Read all reviews
              </Typography>
            </Link>
          </Box>

          <Divider />

          <Divider />
        </Grid>
        <Grid item md={3} m="15px">
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
