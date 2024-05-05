import { configureStore } from "@reduxjs/toolkit";

// Import reducers
import authReducers from "./auth/auth.reducers";
import userReducers from "./user/user.reducers";
import moviesReducers from "./movies/movies.reducers";
import movieReducers from "./movie/movie.reducers";
import castReducers from "./cast/cast.reducers";
import watchlistReducers from "./watchlist/watchlist.reducers";
import ratingReducers from "./rating/rating.reducers";
import reviewReducers from "./review/review.reducers";
import accountReducers from "./accounts/account.reducers";
import searchReducers from "./search/search.reducers";
import roomReducers from "./room/room.reducers";

export default configureStore({
  reducer: {
    auth: authReducers,
    user: userReducers,
    movies: moviesReducers,
    movie: movieReducers,
    cast: castReducers,
    watchlist: watchlistReducers,
    rating: ratingReducers,
    review: reviewReducers,
    account: accountReducers,
    search: searchReducers,
    room: roomReducers,
  },
});
