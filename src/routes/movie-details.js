import React from "react";
import { useSelector } from "react-redux";
import MovieDetailsBanner from "../components/movie-details-body/movie-details-banner";
import MovieDetailsInfo from "../components/movie-details-body/movie-details-info";
import { useParams } from "react-router-dom";
import useFetchMovieDetails from "../hooks/useFetchMovieDetails";

export default function MovieDetailsContent() {
  const { movieId } = useParams();
  useFetchMovieDetails(movieId);
  const { movieDetails } = useSelector((state) => state.movie.movieDetails);

  return (
    <>
      {movieDetails && ( // Check if movie is not null before rendering
        <>
          <MovieDetailsBanner movie={movieDetails} />
          <MovieDetailsInfo movie={movieDetails} />
        </>
      )}
    </>
  );
}
