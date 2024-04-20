import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMovieDetails } from "../store/movie/movie.actions";

const useFetchMovieDetails = (movieId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        dispatch(fetchMovieDetails(movieId));
      } catch (err) {
        console.log(err);
      }
    };

    fetchMovie();
  }, [movieId, dispatch]);
};

export default useFetchMovieDetails;
