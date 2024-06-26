const filterAndSort = (
  data,
  ratings,
  movieRatings,
  fetchedDataDetails,
  filterBy,
  sortBy
) => {
  return (
    data &&
    ratings &&
    data.slice().sort((a, b) => {
      //Make a shallow copy of the data
      const movieA = fetchedDataDetails[a.movie_id];
      const movieB = fetchedDataDetails[b.movie_id];
      const movieARating = movieRatings[a.movie_id];
      const movieBRating = movieRatings[b.movie_id];
      const movieAUserRating =
        ratings.find((rating) => rating.movie_id === a.movie_id)?.rating || 0;
      const movieBUserRating =
        ratings.find((rating) => rating.movie_id === b.movie_id)?.rating || 0;
      switch (filterBy) {
        case "date_added":
          return sortBy === "asc"
            ? new Date(a.created_at) - new Date(b.created_at)
            : new Date(b.created_at) - new Date(a.created_at);
        case "movie_rating":
          return sortBy === "asc"
            ? movieARating - movieBRating
            : movieBRating - movieARating;
        case "user_rating":
          return sortBy === "asc"
            ? movieAUserRating - movieBUserRating
            : movieBUserRating - movieAUserRating;
        case "release_date":
          return sortBy === "asc"
            ? new Date(movieA?.release_date) - new Date(movieB?.release_date)
            : new Date(movieB?.release_date) - new Date(movieA?.release_date);
        default:
          return true;
      }
    })
  );
};

export default filterAndSort;
