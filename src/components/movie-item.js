import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { Img } from "../routes/root";
import RatingBox from "./rating-box";
import { WatchlistButton } from "../routes/root";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import LoadingButton from "@mui/lab/LoadingButton";

const MovieItem = ({
  movie,
  movieIndex,
  isAuthenticated,
  watchlistMovies,
  ratingMovies,
  loadingMovie,
  handleAddToWatchlist,
  navigate,
}) => {
  return (
    <Box
      key={movieIndex}
      display="flex"
      flexDirection="column"
      flexShrink={0}
      width={"15%"}
      my={2}
    >
      <Box>
        <Link to={`/movies/${movie.id}`}>
          <Img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            sx={{ borderRadius: "8px" }}
          />
        </Link>
      </Box>

      <RatingBox
        movie={{
          movieRating: Math.round(movie.vote_average * 10) / 10,
          movieTitle: movie.title,
          movieId: movie.id,
          userRating: ratingMovies.find(
            (rating) => rating.movie_id === movie.id
          )?.rating,
        }}
      />

      <Typography
        fontWeight="bold"
        mb="20px"
        sx={{ flexGrow: 1 }}
      >
        {movie.title}
      </Typography>
      {isAuthenticated ? (
        watchlistMovies.find(
          (watchlistMovie) => watchlistMovie.movie_id === movie.id
        ) ? (
          <WatchlistButton
            variant="contained"
            onClick={() => handleAddToWatchlist(movie.id)}
            startIcon={<CheckIcon />}
          >
            Watchlist
          </WatchlistButton>
        ) : (
          <LoadingButton
            onClick={() => handleAddToWatchlist(movie.id)}
            loading={loadingMovie[movie.id]}
            variant="contained"
            loadingPosition="start"
            startIcon={<AddIcon />}
            sx={{
              bgcolor: "#2C2C2C",
              color: "#0DB597",
              "&:hover": { bgcolor: "rgba(13, 181, 151, 0.4)" },
            }}
          >
            <Typography component={"span"}>Watchlist</Typography>
          </LoadingButton>
        )
      ) : (
        <WatchlistButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/login")}
        >
          Watchlist
        </WatchlistButton>
      )}
    </Box>
  );
};

export default MovieItem;
