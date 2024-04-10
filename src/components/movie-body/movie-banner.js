import React from "react";
import { Divider, Chip, Box, Grid, Container } from "@mui/material";
import { WhiteTypography } from "../../routes/root";
import StarIcon from "@mui/icons-material/Star";
import { StarBorder } from "@mui/icons-material";

export default function MovieDetailsBanner({ movie }) {
  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 1,
      }}
    >
      <Container maxWidth="xl">
        <Box display={"flex"} mb={"15px"}>
          <Box mt="30px">
            <WhiteTypography variant="h2" component="h1" fontWeight={"bold"}>
              {movie.title}
            </WhiteTypography>
            <WhiteTypography sx={{ color: "common.white" }}>
              Year | Certification | Duration
            </WhiteTypography>
          </Box>
          <Box
            sx={{
              ml: "auto",
              width: "30%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid container>
              <Grid
                item
                md={6}
                sx={{
                  textAlign: "center",
                  margin: "auto",
                }}
              >
                <WhiteTypography>KMHb RATING</WhiteTypography>
                <Box display="flex" justifyContent="center">
                  <StarIcon sx={{ color: "main" }} />
                  <WhiteTypography ml="3px">10/10</WhiteTypography>
                </Box>
              </Grid>
              <Grid item md={6} sx={{ textAlign: "center" }}>
                <WhiteTypography>YOUR RATING</WhiteTypography>
                <Box display="flex" justifyContent="center">
                  <StarBorder sx={{ color: "main" }} />
                  <WhiteTypography ml="3px">9.2/10</WhiteTypography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box display={"flex"}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width="20%"
          />
          <iframe
            src={`https://www.youtube.com/embed/${movie.key}`}
            title={movie.title}
            style={{ flex: 1 }}
          />
          <Box>
            <Box
              sx={{
                height: "200px",
                width: "200px",
                backgroundColor: "blue",
                ml: "5px",
                mb: "5px",
              }}
            />
            <Box
              sx={{
                height: "200px",
                width: "200px",
                backgroundColor: "blue",
                ml: "5px",
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: "15px",
            gap: "10px",
          }}
        >
          <Box>
            {movie.genres.map((genre, index) => (
              <Chip
                key={index}
                label={genre.name}
                clickable
                sx={{
                  marginRight: "5px",
                  color: "#fff",
                  border: "1px solid #fff",
                  bgcolor: "transparent",
                }}
              />
            ))}
          </Box>
          <WhiteTypography sx={{ my: "10px" }}>
            {movie.overview}
          </WhiteTypography>
          <Divider />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <WhiteTypography variant="h6" gutterBottom mb={"auto"} mr={"15px"}>
              Director
            </WhiteTypography>
            <WhiteTypography>Director's name</WhiteTypography>
          </Box>
          <Divider />
          <Box sx={{ display: "flex", alignItems: "center", mb: "20px" }}>
            <WhiteTypography variant="h6" gutterBottom mb={"auto"} mr={"15px"}>
              Writers
            </WhiteTypography>
            <WhiteTypography>Writer's name</WhiteTypography>
          </Box>
        </Box>
      </Container>

      <Box
        sx={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1, // Set background image z-index lower
        }}
      >
        <Box
          sx={{
            position: "absolute", // Ensures overlay stays on top
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
        />
      </Box>
    </Box>
  );
}
