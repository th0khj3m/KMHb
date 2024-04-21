import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchMovieDetails } from "../store/movie/movie.actions";

const useFetchMovieData = (setFetchedDataDetails, data) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!data) return; // Early exit if watchlistMovies is not yet available
    const dataIds = data?.map((movie) => movie.movie_id);
    dataIds.forEach((movieId) => {
      dispatch(fetchMovieDetails(movieId))
        .unwrap()
        .then((movieDetails) => {
          setFetchedDataDetails((prevDetails) => ({
            ...prevDetails,
            [movieId]: movieDetails,
          }));
        })
        .catch((error) => {
          console.error("Error fetching details for movie", movieId, error);
        }); // Dispatch action with movie_id
    });
  }, [data, dispatch, setFetchedDataDetails]);
};

export default useFetchMovieData;
