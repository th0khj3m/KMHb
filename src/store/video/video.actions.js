import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { apiUrl, apiKeyParams } from "../../api-config";
import findNewestTrailer from "../../utils/find-newest-trailer";

export const fetchNewestTrailer = createAsyncThunk(
  "video/fetchNewestTrailer",
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
