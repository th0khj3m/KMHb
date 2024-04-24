import axios from "axios";
import { apiUrl, apiKeyParams, apiRequestParams } from "../../api-config.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const searchMovies = createAsyncThunk(
  "search/searchMovies",
  async (query) => {
    try {
      const response = await axios.get(
        `${apiUrl}/search/movie${apiKeyParams}${apiRequestParams}&query=${query}`
      );
      return response.data.results;
    } catch (error) {
      throw error;
    }
  }
);