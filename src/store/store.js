import { configureStore } from "@reduxjs/toolkit";

// Import reducers
import listReducer from "./list/list.reducers";
import authReducer from "./auth/auth.reducers";
import movieReducer from "./movie/movie.reducers";
import videoReducer from "./video/video.reducers";

export default configureStore({
  reducer: {
    auth: authReducer,
    movies: movieReducer,
    videos: videoReducer,
    list: listReducer,
  },
});
