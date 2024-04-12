import React, { useState } from "react";
import { Link } from "react-router-dom";

//MUI
import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Box,
} from "@mui/material";

import MovieRating from "../movie-rating";
import { Img } from "../../routes/root";

const testMovie = {
  adult: false,
  backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
  id: 693134,
  title: "Dune: Part Two",
  original_language: "en",
  original_title: "Dune: Part Two",
  overview:
    "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
  poster_path: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
  media_type: "movie",
  genre_ids: [878, 12],
  popularity: 986.406,
  release_date: "2024-02-27",
  video: false,
  vote_average: 8.359,
  vote_count: 2466,
};

const sections = [{ title: "Trending" }, { title: "Latest" }];

export default function Body() {
  const [timeframe, setTimeframe] = useState("day");

  const handleTimeframeChange = (event, newValue) => {
    setTimeframe(newValue);
  };

  return (
    <>
      {sections.map((section, index) => (
        <Box key={index} mt="50px" ml="35px">
          <Box display="flex" alignItems={"center"} mb="20px">
            <Typography variant="h4" component={"h2"}>
              {`${section.title}`}
            </Typography>
            {index === 0 && (
              <ToggleButtonGroup
                exclusive
                value={timeframe}
                onChange={handleTimeframeChange}
                sx={{ ml: "20px" }}
                color="info"
              >
                <ToggleButton value="day">Day</ToggleButton>
                <ToggleButton value="week">Week</ToggleButton>
              </ToggleButtonGroup>
            )}
          </Box>

          <Box display="flex" gap="20px" overflow={"auto"} pb="20px" mb="20px">
            {Array.from({ length: 10 }).map((_, filmIndex) => (
              <Box
                display="flex"
                flexDirection="column"
                width="15%"
                flexShrink="0"
                key={filmIndex}
              >
                <Link to={`/movies/${testMovie.id}`}>
                  <Img
                    src={`https://image.tmdb.org/t/p/w500${testMovie.poster_path}`}
                    alt={testMovie.title}
                    sx={{ borderRadius: "8px" }}
                  />
                </Link>

                <MovieRating movie={testMovie.title}/>

                <Typography fontWeight={"bold"} mb={"20px"}>
                  {testMovie.title}
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
            ))}
          </Box>
        </Box>
      ))}
    </>
  );
}
