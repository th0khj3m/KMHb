import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { apiUrl, apiKeyParams } from "../../api-config";

export const fetchUpcomingMovies = createAsyncThunk(
  "movies/fetchUpcomingMovies",
  async (_, thunkAPI) => {
    try {
      const urlToFetch = `${apiUrl}/movie/upcoming${apiKeyParams}&page=1`;
      const response = await axios.get(urlToFetch);
      const upcomingMovies = response.data.results.slice(0, 10); //Fetch 10 movies
      return {
        upcomingMovies,
      }; // Return array of upcoming movies
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
