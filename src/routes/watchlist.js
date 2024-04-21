import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useFetchMovieData from "../hooks/useFetchMovieData";
import { loadWatchlist } from "../store/watchlist/watchlist.actions";
import UserPage from "../components/user-pages";

export default function Watchlist() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const watchlistMovies = useSelector((state) => state.watchlist.movies);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadWatchlist());
    }
  }, [dispatch, isAuthenticated]);

  const [fetchedDataDetails, setFetchedDataDetails] = useState({});
  useFetchMovieData(setFetchedDataDetails, watchlistMovies);

  return (
    <UserPage
      fetchedDataDetails={fetchedDataDetails}
      data={watchlistMovies}
    />
  );
}
