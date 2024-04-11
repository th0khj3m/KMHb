import React from "react";
import MovieDetailsBanner from "../components/movie-details-body/movie-details-banner";
import MovieDetailsInfo from "../components/movie-details-body/movie-details-info";

const testMovie = {
  adult: false,
  backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
  id: 693134,
  title: "Dune: Part Two",
  original_language: "en",
  original_title: "Dune: Part Two",
  overview:
    "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
  poster_path: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
  budget: 190000000,
  media_type: "movie",
  popularity: 986.406,
  revenue: 660000000,
  runtime: 167,
  status: "Released",
  release_date: "2024-02-27",
  video: false,
  vote_average: 8.359,
  vote_count: 2466,
  key: "6czYOLR3tBg",
  genres: [
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 12,
      name: "Adventure",
    },
  ],
  casts: {
    cast: [
      {
        adult: false,
        gender: 2,
        id: 1190668,
        known_for_department: "Acting",
        name: "Timothée Chalamet",
        original_name: "Timothée Chalamet",
        popularity: 125.345,
        profile_path: "/BE2sdjpgsa2rNTFa66f7upkaOP.jpg",
        cast_id: 2,
        character: "Paul Atreides",
        credit_id: "5e959c45955c6500159f1c98",
        order: 0,
      },
    ],
  },
};

export default function MovieDetailsContent() {
  return (
    <>
      <MovieDetailsBanner movie={testMovie} />
      <MovieDetailsInfo movie={testMovie} />
    </>
  );
}
