import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadRatings } from "../store/rating/rating.actions";
import useFetchMovieData from "./useFetchMovieData";

export default function useLoadWatchlist() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const ratingMovies = useSelector((state) => state.rating.ratings);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadRatings());
    }
  }, [dispatch, isAuthenticated]);

  const [fetchedData, setFetchedData] = useState({});
  useFetchMovieData(setFetchedData, ratingMovies);
}
