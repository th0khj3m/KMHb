import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { apiUrl, apiKeyParams } from "../../api-config";

export const fetchMovieDetails = createAsyncThunk(
  "movie/fetchMovieDetails",
  async (movieId, thunkAPI) => {
    try {
      const urlToFetch = `${apiUrl}/movie/${movieId}${apiKeyParams}&append_to_response=casts`;
      const response = await axios.get(urlToFetch);
      return {
        movieDetails: response.data,
        movieId,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
