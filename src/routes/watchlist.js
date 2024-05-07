import React, { useState } from "react";
import { useSelector } from "react-redux";
import useFetchMovieData from "../hooks/useFetchMovieData";
import UserPage from "../components/user-pages";

export default function Watchlist() {
  const { movies: watchlistMovies, loading } = useSelector(
    (state) => state.watchlist
  );

  const [fetchedDataDetails, setFetchedDataDetails] = useState({});
  useFetchMovieData(setFetchedDataDetails, watchlistMovies);

  return (
    <>
      {!loading && fetchedDataDetails && watchlistMovies && (
        <UserPage
          data={watchlistMovies}
          fetchedDataDetails={fetchedDataDetails}
          type={"watchlist"}
        />
      )}
    </>
  );
}
