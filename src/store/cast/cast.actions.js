import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl, apiKeyParams, apiRequestParams } from "../../api-config";

export const fetchTrendingCasts = createAsyncThunk(
  "cast/fetchTrendingCasts",
  async (_, thunkAPI) => {
    try {
      const urlToFetch = `${apiUrl}/trending/person/week${apiKeyParams}${apiRequestParams}`;
      const response = await axios.get(urlToFetch);
      return {
        trendingCasts: response.data.results,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const fetchCastDetails = createAsyncThunk(
  "cast/fetchCastDetails",
  async (castId, thunkAPI) => {
    try {
      // Fetch movie details
      const castDetailsUrl = `${apiUrl}/person/${castId}${apiKeyParams}`;
      const castDetailsResponse = await axios.get(castDetailsUrl);
      const castDetails = castDetailsResponse.data;

      // Fetch movie credits
      const movieCreditsUrl = `${apiUrl}/person/${castId}/movie_credits${apiKeyParams}`;
      const movieCreditsResponse = await axios.get(movieCreditsUrl);
      const movieCredits = movieCreditsResponse.data;

      // Fetch movie images
      const movieImagesUrl = `${apiUrl}/person/${castId}/images${apiKeyParams}`;
      const movieImagesResponse = await axios.get(movieImagesUrl);
      const movieImages = movieImagesResponse.data;

      // Fetch external ids
      const externalIdsUrl = `${apiUrl}/person/${castId}/external_ids${apiKeyParams}`;
      const externalIdsResponse = await axios.get(externalIdsUrl);
      const externalIds = externalIdsResponse.data;

      return {
        castDetails: {
          ...castDetails,
          movieCredits,
          movieImages,
          externalIds,
        },
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
