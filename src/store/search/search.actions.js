import axios from "axios";
import { apiUrl, apiKeyParams, apiRequestParams } from "../../api-config.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const searchMovies = createAsyncThunk(
  "search/searchMovies",
  async (query, thunkAPI) => {
    try {
      const response = await axios.get(
        `${apiUrl}/search/multi${apiKeyParams}${apiRequestParams}&query=${query}`
      );
      const results = response.data.results;
      // Filter to only include movies and people (cast)
      const filteredResults = results.filter(
        (item) => item.media_type === "movie" || item.media_type === "person"
      );
      return filteredResults;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
