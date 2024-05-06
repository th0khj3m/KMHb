import React, { useState } from "react";
import { useSelector } from "react-redux";
import useFetchMovieData from "../hooks/useFetchMovieData";
import UserPage from "../components/user-pages";

export default function Ratings() {
  const { ratings: ratingMovies } = useSelector((state) => state.rating);

  const [fetchedDataDetails, setFetchedDataDetails] = useState({});
  useFetchMovieData(setFetchedDataDetails, ratingMovies);

  return (
    <>
      {fetchedDataDetails && ratingMovies && (
        <UserPage
          fetchedDataDetails={fetchedDataDetails}
          data={ratingMovies}
          type={"ratings"}
        />
      )}
    </>
  );
}
