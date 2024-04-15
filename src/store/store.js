import { configureStore } from "@reduxjs/toolkit";

// Import reducers
import listReducers from "./list/list.reducers";
import authReducers from "./auth/auth.reducers";
import moviesReducers from "./movies/movies.reducers";
import movieReducers from "./movie/movie.reducers";
import videoReducers from "./video/video.reducers";

export default configureStore({
  reducer: {
    auth: authReducers,
    movies: moviesReducers,
    movie: movieReducers,
    videos: videoReducers,
    list: listReducers,
  },
});
