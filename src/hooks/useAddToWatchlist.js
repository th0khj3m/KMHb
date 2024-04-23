import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMovie, removeMovie } from "../store/watchlist/watchlist.actions";

const useAddToWatchlist = () => {
  const dispatch = useDispatch();
  const watchlistMovies = useSelector((state) => state.watchlist.movies);
  const [loadingMovie, setLoadingMovie] = useState({});

  const handleAddToWatchlist = async (movieId) => {
    // Check if the movie is already in the watchlist
    const isMovieInWatchlist = watchlistMovies.some(
      (watchlistMovie) => watchlistMovie.movie_id === movieId
    );

    // Set loading state of the specific movie to true
    setLoadingMovie((prevState) => ({
      ...prevState,
      [movieId]: true,
    }));

    try {
      if (isMovieInWatchlist) {
        await dispatch(removeMovie(movieId));
      } else {
        await dispatch(addMovie(movieId));
      }

      // Set loading state of the specific movie to false on success
      setLoadingMovie((prevState) => ({
        ...prevState,
        [movieId]: false,
      }));
    } catch (error) {
      // Set loading state of the specific movie to false on error
      setLoadingMovie((prevState) => ({
        ...prevState,
        [movieId]: false,
      }));
      console.log(error);
    }
  };

  return {
    handleAddToWatchlist,
    loadingMovie,
  };
};

export default useAddToWatchlist;
