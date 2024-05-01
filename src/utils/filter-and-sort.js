const filterAndSort = (data, ratings, fetchedDataDetails, filterBy, sortBy) => {
  return (
    data &&
    ratings &&
    data.slice().sort((a, b) => {
      const movieA = fetchedDataDetails[a.movie_id]?.movieDetails;
      const movieB = fetchedDataDetails[b.movie_id]?.movieDetails;
      const movieARating =
        ratings.find((rating) => rating.movie_id === a.movie_id)?.rating || 0;
      const movieBRating =
        ratings.find((rating) => rating.movie_id === b.movie_id)?.rating || 0;
      switch (filterBy) {
        case "date_added":
          return sortBy === "asc"
            ? new Date(a.added_at) - new Date(b.added_at)
            : new Date(b.added_at) - new Date(a.added_at);
        case "movie_rating":
          return sortBy === "asc"
            ? movieA.vote_average - movieB.vote_average
            : movieB.vote_average - movieA.vote_average;
        case "user_rating":
          return sortBy === "asc"
            ? movieARating - movieBRating
            : movieBRating - movieARating;
        case "release_date":
          return sortBy === "asc"
            ? new Date(movieA.release_date) - new Date(movieB.release_date)
            : new Date(movieB.release_date) - new Date(movieA.release_date);
        default:
          return true;
      }
    })
  );
};

export default filterAndSort;
