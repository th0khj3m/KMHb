import { useEffect } from "react";
import { Typography, Box, Stack, Grid, Container, Paper } from "@mui/material";
import { Img } from "../root";
import { useSelector, useDispatch } from "react-redux";
import { fetchTrendingCasts } from "../../store/cast/cast.actions";
import { clampStyles } from "../root";
import { Link } from "react-router-dom";

export default function MenuCasts() {
  const dispatch = useDispatch();
  const { trendingCasts } = useSelector((state) => state.cast.trendingCasts);

  useEffect(() => {
    const fetchCasts = async () => {
      await dispatch(fetchTrendingCasts());
    };
    fetchCasts();
  }, [dispatch]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" component={"h1"} fontWeight={"bold"} my={5}>
        Popular People
      </Typography>
      <Grid container spacing={2}>
        {trendingCasts &&
          trendingCasts.map((cast, index) => (
            <Grid item md={2} key={index}>
              <Paper elevation={3} sx={{ borderRadius: 4, padding: 2 }}>
                <Stack spacing={2}>
                  <Link
                    to={`/casts/${cast.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Img
                      src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                    />
                  </Link>
                  <Box>
                    <Typography fontWeight="bold" sx={{ ...clampStyles }}>
                      {cast.name}
                    </Typography>
                    <Typography sx={{ ...clampStyles }}>
                      {cast.known_for
                        .slice(0, 3)
                        .map((movie) => movie.name || movie.title || "Unknown")
                        .join(", ")}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
