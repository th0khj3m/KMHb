import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { parseISO, compareDesc } from "date-fns";

import { apiUrl, apiKeyParams } from "../../api-config";

export const fetchNewestTrailer = createAsyncThunk(
    "video/fetchNewestTrailer",
    async (movieId, thunkAPI) => {
      try {
        const urlToFetch = `${apiUrl}/movie/${movieId}/videos${apiKeyParams}`;
        const response = await axios.get(urlToFetch);

        //Filter videos to include only official trailers
        const officialTrailers = response.data.results.filter(
          (video) => video.type === "Trailer" && video.official === true
        );

        //Sort videos by published_at date in descending order to get the newest
        officialTrailers.sort((a, b) =>
          compareDesc(parseISO(a.published_at), parseISO(b.published_at))
        );

        // Return the newest official trailer
        return {
          video: officialTrailers.length > 0 ? officialTrailers[0] : null,
        }; // Return videos related to that specific id
      } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
      }
    }
  );