import { useSelector } from "react-redux";

const useIsInWatchlist = (movieId) => {
  const watchlistMovies = useSelector((state) => state.watchlist.movies);

  return watchlistMovies.some(
    (watchlistMovie) => watchlistMovie.movie_id === movieId
  );
};

export default useIsInWatchlist;
