import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieDetailsBanner from "../components/movie-details-body/movie-details-banner";
import MovieDetailsInfo from "../components/movie-details-body/movie-details-info";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../store/movie/movie.actions";

export default function MovieDetailsContent() {
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const movie = useSelector((state) => state.movie.movieDetails);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        await dispatch(fetchMovieDetails(movieId)).unwrap();
      } catch (err) {
        console.log(err);
      }
    };
    fetchMovie();
  }, [movieId, dispatch]);

  return (
    <>
      {movie && ( // Check if movie is not null before rendering
        <>
          <MovieDetailsBanner movie={movie}/>
          <MovieDetailsInfo movie={movie} />
        </>
      )}
    </>
  );
}
