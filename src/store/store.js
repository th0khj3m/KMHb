import { configureStore } from "@reduxjs/toolkit";

// Import reducers
import listReducers from "./list/list.reducers";
import authReducers from "./auth/auth.reducers";
import moviesReducers from "./movies/movies.reducers";
import movieReducers from "./movie/movie.reducers";
import videoReducers from "./video/video.reducers";
import castReducers from "./cast/cast.reducers";
import userReducers from "./user/user.reducers";

export default configureStore({
  reducer: {
    auth: authReducers,
    user: userReducers,
    movies: moviesReducers,
    movie: movieReducers,
    video: videoReducers,
    cast: castReducers,
    list: listReducers,
  },
});
