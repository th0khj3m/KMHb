import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { apiUrl, apiKeyParams, apiRequestParams } from "../../api-config";
import { formatDate } from "../../utils/format-date";
import findNewestTrailer from "../../utils/find-newest-trailer";

export const fetchUpcomingMovies = createAsyncThunk(
  "movies/fetchUpcomingMovies",
  async (_, thunkAPI) => {
    try {
      const urlToFetch = `${apiUrl}/movie/upcoming${apiKeyParams}`;
      const response = await axios.get(urlToFetch);
      const upcomingMovies = response.data.results.slice(0, 10); //Fetch 10 movies
      return upcomingMovies;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
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
      return thunkAPI.rejectWithValue(err);
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
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const fetchNewestTrailer = createAsyncThunk(
  "movies/fetchNewestTrailers",
  async (movieId, thunkAPI) => {
    try {
      const urlToFetch = `${apiUrl}/movie/${movieId}/videos${apiKeyParams}`;
      const response = await axios.get(urlToFetch);

      //Filter videos to include only official trailers
      const newestTrailer = findNewestTrailer(response.data.results);
      return newestTrailer;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const fetchDiscoverMovies = createAsyncThunk(
  "movies/fetchDiscoverMovies",
  async (
    { sortBy = "popularity.desc", releaseDate } = {}, //Default values and passed in if no parameters passed
    thunkAPI
  ) => {
    try {
      let urlToFetch = `${apiUrl}/discover/movie${apiKeyParams}&sort_by=${sortBy}`;

      // Check if releaseDate is provided and contains valid startDate and endDate
      if (releaseDate) {
        // Format startDate and endDate using formatDate function if necessary
        const formattedStartDate = formatDate(releaseDate[0]?.startDate);
        const formattedEndDate = formatDate(releaseDate[0]?.endDate);

        // Add primary_release_date parameters to URL
        urlToFetch += `&primary_release_date.gte=${formattedStartDate}&primary_release_date.lte=${formattedEndDate}`;
      }

      const response = await axios.get(urlToFetch);
      return {
        discoverMovies: response.data.results,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
