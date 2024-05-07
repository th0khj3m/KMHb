import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addMovie, removeMovie } from "../store/watchlist/watchlist.actions";
import useIsInWatchlist from "./useIsInWatchlist";

const useWatchlistManagement = (movieId) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const isMovieInWatchlist = useIsInWatchlist(movieId);

  const handleWatchlistManagement = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      if (isMovieInWatchlist) {
        await dispatch(removeMovie(movieId));
      } else {
        await dispatch(addMovie(movieId));
      }
    } catch (err) {
      throw err;
    }
  };

  return {
    handleWatchlistManagement,
  };
};

export default useWatchlistManagement;
