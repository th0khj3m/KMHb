import React from "react";
import {
  Container,
  Box,
  Paper,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import { Img } from "./root";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import RatingBox from "../components/rating-box";
import { format } from "date-fns";
import { HighlightOff } from "@mui/icons-material";

const testMovie = {
  adult: false,
  backdrop_path: "/FUnAVgaTs5xZWXcVzPJNxd9qGA.jpg",
  belongs_to_collection: {
    id: 934765,
    name: "Rebel Moon Collection",
    poster_path: "/17fiEIxD7ClGW33IdxpRb0mdXgF.jpg",
    backdrop_path: "/tCo96jmjKEMoWa5eCZNNss3MtMH.jpg",
  },
  budget: 83000000,
  genres: [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 18,
      name: "Drama",
    },
  ],
  homepage: "https://www.netflix.com/title/81624666",
  id: 934632,
  imdb_id: "tt23137904",
  origin_country: ["US"],
  original_language: "en",
  original_title: "Rebel Moon - Part Two: The Scargiver",
  overview:
    "The rebels gear up for battle against the Motherworld as unbreakable bonds are forged, heroes emerge — and legends are made.",
  popularity: 209.302,
  poster_path: "/cxevDYdeFkiixRShbObdwAHBZry.jpg",
  production_companies: [
    {
      id: 114152,
      logo_path: null,
      name: "The Stone Quarry",
      origin_country: "US",
    },
    {
      id: 156880,
      logo_path: null,
      name: "Grand Electric",
      origin_country: "US",
    },
  ],
  production_countries: [
    {
      iso_3166_1: "US",
      name: "United States of America",
    },
  ],
  release_date: "2024-04-05",
  revenue: 0,
  runtime: 123,
  spoken_languages: [
    {
      english_name: "English",
      iso_639_1: "en",
      name: "English",
    },
  ],
  status: "Released",
  tagline: "",
  title: "Rebel Moon - Part Two: The Scargiver",
  video: false,
  vote_average: 8,
  vote_count: 2,
};

export default function Watchlist() {
  const formattedDate = format(
    new Date(testMovie.release_date),
    "MMMM d, yyyy"
  );
  return (
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      <Stack>
        <Typography variant="h4" component={"h1"} fontWeight={"bold"}>
          My Watchlist
        </Typography>
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
          <Grid container spacing={6} width={"80%"}>
            <Grid item md={2}>
              <Box>
                <Img
                  src={`https://image.tmdb.org/t/p/w500${testMovie.poster_path}`}
                  sx={{
                    borderRadius: "8px 0 0 8px",
                  }}
                />
              </Box>
            </Grid>
            <Grid display={"flex"} item md={10} alignItems={"center"}>
              <Stack gap={1}>
                <Box>
                  <Typography variant="h5" fontWeight={"bold"} component={"h2"}>
                    {testMovie.title}
                  </Typography>
                  <Typography color={"#66667D"}>{formattedDate}</Typography>
                  <RatingBox />
                </Box>
                <Typography fontSize={"18px"}>{testMovie.overview}</Typography>
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
      </Stack>
    </Container>
  );
}
