import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Check as CheckIcon, Add as AddIcon } from "@mui/icons-material";

import RatingBox from "./rating-box";
import { WatchlistButton, Img } from "../routes/root";

import useIsInWatchlist from "../hooks/useIsInWatchlist";
import useWatchlistManagement from "../hooks/useWatchlistManagement";

const MovieItem = ({ movie, movieWidth = "15%", movieHeight }) => {
  const { loadingMovie } = useSelector((state) => state.watchlist);

  const isMovieInWatchlist = useIsInWatchlist(movie.id);
  const { handleWatchlistManagement } = useWatchlistManagement(movie.id);

  const imagePath = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `/images/no-image.png`;

  return (
    <Box
      key={movie.id}
      display="flex"
      flexDirection="column"
      flexShrink={0}
      width={movieWidth}
      my={2}
    >
      <Box>
        <Link to={`/movies/${movie.id}`}>
          <Img
            src={imagePath}
            alt={movie.title}
            sx={{ borderRadius: "8px" }}
            height={movieHeight}
          />
        </Link>
      </Box>

      <RatingBox movie={movie} />

      <Typography fontWeight="bold" mb="20px" sx={{ flexGrow: 1 }}>
        {movie.title}
      </Typography>

      {!loadingMovie[movie.id] ? (
        <WatchlistButton
          variant="contained"
          onClick={() => handleWatchlistManagement()}
          startIcon={isMovieInWatchlist ? <CheckIcon /> : <AddIcon />}
        >
          Watchlist
        </WatchlistButton>
      ) : (
        <LoadingButton
          loading={loadingMovie[movie.id]}
          variant="contained"
          loadingPosition="center"
          sx={{
            bgcolor: "#2C2C2C",
            color: "#0DB597",
            "&:hover": { bgcolor: "rgba(13, 181, 151, 0.4)" },
          }}
        >
          <Typography component={"span"}>Watchlist</Typography>
        </LoadingButton>
      )}
    </Box>
  );
};

export default MovieItem;
