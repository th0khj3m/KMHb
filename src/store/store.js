import { configureStore } from "@reduxjs/toolkit";

// Import reducers
import authReducers from "./auth/auth.reducers";
import userReducers from "./user/user.reducers";
import moviesReducers from "./movies/movies.reducers";
import movieReducers from "./movie/movie.reducers";
import videoReducers from "./video/video.reducers";
import castReducers from "./cast/cast.reducers";
import watchlistReducers from "./watchlist/watchlist.reducers";

export default configureStore({
  reducer: {
    auth: authReducers,
    user: userReducers,
    movies: moviesReducers,
    movie: movieReducers,
    video: videoReducers,
    cast: castReducers,
    watchlist: watchlistReducers,
  },
});
