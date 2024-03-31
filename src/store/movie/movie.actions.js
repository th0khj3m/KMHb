import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { apiUrl, apiKeyParams } from "../../api-config";

export const fetchUpcomingMovies = createAsyncThunk(
  "movie/fetchUpcomingMovies",
  async (movie, thunkAPI) => {
    try {
      const urlToFetch = `${apiUrl}/movie/upcoming${apiKeyParams}`;
      const response = await axios.get(urlToFetch);
      return response.data.results; // Return array of upcoming movies
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);


