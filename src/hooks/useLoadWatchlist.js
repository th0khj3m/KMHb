import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadRatings } from "../store/rating/rating.actions";
import useFetchMovieData from "./useFetchMovieData";
import { loadWatchlist } from "../store/watchlist/watchlist.actions";

export default function useLoadWatchlist() {
  const dispatch = useDispatch();
  const [fetchedData, setFetchedData] = useState({});
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const watchlistMovies = useSelector((state) => state.watchlist.movies);
  const ratingMovies = useSelector((state) => state.rating.ratings);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadRatings());
      dispatch(loadWatchlist());
    }
  }, [dispatch, isAuthenticated]);

  useFetchMovieData(setFetchedData, ratingMovies);
}
