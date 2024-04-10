import React from "react";
import { Typography, Box, Grid, Paper, Divider, Chip } from "@mui/material";
import { Star } from "@mui/icons-material";
import { Link } from "@mui/material";
import { Img } from "../../routes/root";

export default function MovieDetailsInfo({ movie }) {
  const {
    casts: { cast },
  } = movie;

  return (
      <Grid container spacing={10} pt={"30px"}> 
        <Grid item md={8}>
          <Box>
            <Typography variant="h5" fontWeight="600" mb="15px" component="h2">
              Top billed cast
            </Typography>
            <Box display="flex" gap="15px" overflow="auto">
              {Array.from({ length: 9 }).map((_, index) => (
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
                      src={`https://image.tmdb.org/t/p/w500${cast[0].profile_path}`}
                      alt="hehe"
                    />
                  </Link>

                  <Box p="10px">
                    <Typography sx={{ fontWeight: "bold" }}>
                      {cast[0].name}
                    </Typography>
                    <Typography>{cast[0].character}</Typography>
                  </Box>
                </Paper>
              ))}
            </Box>
            <Typography fontWeight="bold" my="20px">
              Full cast & crew
            </Typography>
          </Box>

          <Divider />

          <Box my="15px">
            <Typography variant="h5" component="h2" fontWeight={"600"}>
              User reviews
            </Typography>
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
                <Typography fontWeight={"600"}>
                  An offer so good, i couldn't refuse
                </Typography>
                <Box display={"flex"} mb={"15px"} alignItems={"center"}>
                  <Chip
                    icon={<Star color="primary" />}
                    label={movie.vote_average}
                    sx={{ color: "white", bgcolor: "#0DB597" }}
                  />
                  <Typography ml={"5px"}>
                    Written by{" "}
                    <Typography variant="span" fontWeight={"bold"}>
                      user{" "}
                    </Typography>
                    on date
                  </Typography>
                </Box>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus suscipit felis eget nulla iaculis tincidunt. In hac
                  habitasse platea dictumst. Suspendisse magna orci, dapibus sed
                  vulputate in, maximus porta odio. Sed pretium orci eu leo
                  aliquam convallis. Suspendisse gravida massa id egestas
                  venenatis. Sed consectetur felis vitae ullamcorper
                  ultricies...
                  <Link>read the rest.</Link>
                </Typography>
              </Box>
            </Paper>
            <Typography fontWeight={"600"}>Read all reviews</Typography>
          </Box>

          <Divider />

          <Box py="15px" display={"flex"} gap="15px" flexDirection={"column"}>
            <Typography fontWeight={"bold"} variant="h5" component="h2">
              Storyline
            </Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              suscipit felis eget nulla iaculis tincidunt. In hac habitasse
              platea dictumst. Suspendisse magna orci, dapibus sed vulputate in,
              maximus porta odio. Sed pretium orci eu leo aliquam convallis.
              Suspendisse gravida massa id egestas venenatis. Sed consectetur
              felis vitae ullamcorper ultricies...
            </Typography>
          </Box>

          <Divider />
        </Grid>
        <Grid item md={3} m="15px">
          <Box display="flex" flexDirection="column" gap="10px">
            <Typography variant="h5" component="h2" fontWeight="bold">
              Details
            </Typography>
            <Box>
              <Typography fontWeight="bold">Release date</Typography>
              <Typography variant="details_info">
                {movie.release_date}
              </Typography>
            </Box>
            <Divider />
            <Box>
              <Typography fontWeight="bold">Original Language</Typography>
              <Typography variant="details_info">
                {movie.original_language}
              </Typography>
            </Box>
            <Divider />
            <Box>
              <Typography fontWeight="bold">Budget</Typography>
              <Typography variant="details_info">${movie.budget}</Typography>
            </Box>
            <Divider />
            <Box>
              <Typography fontWeight="bold">Revenue</Typography>
              <Typography variant="details_info">${movie.revenue}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
}
