import { useEffect } from "react";
import {
  Typography,
  Grid,
  Container,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
} from "@mui/material";
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
      <Typography variant="h4" component={"h1"} fontWeight={"bold"} mt={5}>
        Popular People
      </Typography>
      <Grid container spacing={4} mb={4} mt={2}>
        {trendingCasts &&
          trendingCasts.map((cast, index) => (
            <Grid item md={3} key={index}>
              <Card elevation={3} sx={{ borderRadius: 4, padding: 2 }}>
                <CardActionArea component={Link} to={`/casts/${cast.id}`}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                    alt={cast.name}
                    sx={{ width: "100%", height: "auto" }}
                  />
                </CardActionArea>
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ ...clampStyles }}
                  >
                    {cast.name}
                  </Typography>
                  <Typography variant="body2" sx={{ ...clampStyles }}>
                    {cast.known_for
                      .slice(0, 3)
                      .map((movie) => movie.name || movie.title || "Unknown")
                      .join(", ")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
