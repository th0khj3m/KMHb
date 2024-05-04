import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { apiUrl, apiKeyParams } from "../../api-config";

export const fetchMovieDetails = createAsyncThunk(
  "movie/fetchMovieDetails",
  async (movieId, thunkAPI) => {
    try {
      // Fetch movie details
      const movieDetailsUrl = `${apiUrl}/movie/${movieId}${apiKeyParams}&append_to_response=casts,release_dates,videos`;
      const response = await axios.get(movieDetailsUrl);

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
