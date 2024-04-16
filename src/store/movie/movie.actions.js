import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { apiUrl, apiKeyParams } from "../../api-config";
import { fetchNewestTrailer } from "../video/video.actions";

export const fetchMovieDetails = createAsyncThunk(
  "movie/fetchMovieDetails",
  async (movieId, thunkAPI) => {
    try {
      // Fetch movie details
      const movieDetailsUrl = `${apiUrl}/movie/${movieId}${apiKeyParams}`;
      const movieDetailsResponse = await axios.get(movieDetailsUrl);
      const movieDetails = movieDetailsResponse.data;

      // Fetch cast details
      const castsUrl = `${apiUrl}/movie/${movieId}/casts${apiKeyParams}`;
      const castsResponse = await axios.get(castsUrl);
      const casts = castsResponse.data;

      // Fetch release dates
      const releaseDatesUrl = `${apiUrl}/movie/${movieId}/release_dates${apiKeyParams}`;
      const releaseDatesResponse = await axios.get(releaseDatesUrl);
      const releaseDates = releaseDatesResponse.data;

      // Fetch newest trailer
      const newestTrailerResponse = await thunkAPI.dispatch(
        fetchNewestTrailer(movieId)
      );
      const newestTrailer = newestTrailerResponse.payload.video;

      return {
        movieDetails: {
          ...movieDetails,
          casts,
          releaseDates,
          newestTrailer,
        },
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
