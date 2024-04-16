import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { apiUrl, apiKeyParams, apiRequestParams } from "../../api-config";

export const fetchUpcomingMovies = createAsyncThunk(
  "movies/fetchUpcomingMovies",
  async (_, thunkAPI) => {
    try {
      const urlToFetch = `${apiUrl}/movie/upcoming${apiKeyParams}${apiRequestParams}`;
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

export const fetchTrendingMovies = createAsyncThunk(
  "movies/fetchTrendingMovies",
  async (timeframe, thunkAPI) => {
    try {
      const urlToFetch = `${apiUrl}/trending/movie/${timeframe}${apiKeyParams}${apiRequestParams}`;
      const response = await axios.get(urlToFetch);
      const enMovies = response.data.results.filter(
        (movie) => movie.original_language === "en"
      );
      return {
        trendingMovies: enMovies,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopularMovies",
  async (_, thunkAPI) => {
    try {
      const urlToFetch = `${apiUrl}/movie/popular${apiKeyParams}${apiRequestParams}`;
      const response = await axios.get(urlToFetch);
      return {
        popularMovies: response.data.results,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
