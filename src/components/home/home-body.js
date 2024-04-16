import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

//MUI
import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Box,
} from "@mui/material";
import { clampStyles } from "../../routes/root";

import {
  fetchPopularMovies,
  fetchTrendingMovies,
} from "../../store/movies/movies.actions";

import RatingBox from "../rating-box";
import { Img } from "../../routes/root";

const sections = [{ title: "Trending" }, { title: "Popular" }];

export default function HomeBody() {
  const dispatch = useDispatch();
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
  }, [dispatch, timeframe]);

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
            {movies[index === 0 ? "trendingMovies" : "popularMovies"].map(
              (movie, movieIndex) => (
                <Box
                  key={movieIndex}
                  display="flex"
                  flexDirection="column"
                  width="15%"
                  flexShrink={0}
                >
                  <Link to={`/movies/${movie.id}`}>
                    <Img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      sx={{ borderRadius: "8px" }}
                    />
                  </Link>

                  <RatingBox movie={movie.title} />

                  <Typography
                    fontWeight="bold"
                    mb="20px"
                    sx={{ ...clampStyles, flexGrow: 1 }}
                  >
                    {movie.title}
                  </Typography>

                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#2C2C2C",
                      color: "#0DB597",
                      "&:hover": { bgcolor: "rgba(13, 181, 151, 0.4)" },
                    }}
                  >
                    + Watchlist
                  </Button>
                </Box>
              )
            )}
          </Box>
        </Box>
      ))}
    </>
  );
}
