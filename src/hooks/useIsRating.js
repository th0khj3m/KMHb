import { useSelector } from "react-redux";

const useIsRating = (movieId) => {
  const ratingMovies = useSelector((state) => state.rating.ratings);

  const userRating = ratingMovies.find((rating) => rating.movie_id === movieId);
  return userRating ? userRating.rating : null;
};

export default useIsRating;
