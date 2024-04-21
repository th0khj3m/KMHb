import React from "react";
import {
  Container,
  Box,
  Paper,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { HighlightOff } from "@mui/icons-material";
import { format } from "date-fns";
import { Img } from "../routes/root";

export default function UserPage({ fetchedDataDetails, data }) {
  return (
    <Container maxWidth="xl" sx={{ my: 3 }}>
      <Stack>
        <Typography variant="h4" component={"h1"} fontWeight={"bold"}>
          My Watchlist
        </Typography>
        {data &&
          data.map((watchlistMovie) => {
            const movieId = watchlistMovie?.movie_id;
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
                      <Stack gap={1}>
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
                          {/* <RatingBox /> */}
                        </Box>
                        <Typography fontSize={"18px"}>
                          {movie.overview}
                        </Typography>
                        <Box mt={1}>
                          <IconButton disableRipple sx={{ p: 0 }}>
                            <HighlightOff fontSize="large" />
                          </IconButton>
                          <Typography ml={1} component={"span"}>
                            Remove
                          </Typography>
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
