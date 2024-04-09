import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./homepage-body.css";

//MUI
import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import RatingModal from "../rating-modal/rating-modal";

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
  media_type: "movie",
  genre_ids: [878, 12],
  popularity: 986.406,
  release_date: "2024-02-27",
  video: false,
  vote_average: 8.359,
  vote_count: 2466,
};

const sections = [{ title: "Trending" }, { title: "Latest" }];

export default function Body() {
  const [timeframe, setTimeframe] = useState("day");
  const [openModal, setOpenModal] = useState(false);
  const [modalMovieIndex, setModalMovieIndex] = useState(null);
  const [rating, setRating] = useState("?");

  const handleTimeframeChange = (event, newValue) => {
    setTimeframe(newValue);
  };

  const handleOpenRatingModal = () => {
    setOpenModal(true);
    setModalMovieIndex(testMovie.title);
  };

  return (
    <>
      {sections.map((section, index) => (
        <section className="homepage-body" key={index}>
          <div className="content-section">
            <h2> {`${section.title}`} </h2>
            {index === 0 && (
              <ToggleButtonGroup
                exclusive
                value={timeframe}
                onChange={handleTimeframeChange}
                className="toggle-button-group"
                color="info"
              >
                <ToggleButton value="day">Day</ToggleButton>
                <ToggleButton value="week">Week</ToggleButton>
              </ToggleButtonGroup>
            )}
          </div>
          <div className="film-container-wrapper">
            {Array.from({ length: 10 }).map((_, filmIndex) => (
              <div className="film-container" key={filmIndex}>
                <Link to = {`/movies/${testMovie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${testMovie.poster_path}`}
                    alt={testMovie.title}
                  />
                </Link>

                <div className="rating-container">
                  <StarIcon />
                  <span>8.4</span>
                  <IconButton onClick={() => handleOpenRatingModal()}>
                    <StarBorderIcon />
                  </IconButton>
                </div>

                <span className="movie-title">{testMovie.title}</span>
                <Button>+ Watchlist </Button>
              </div>
            ))}
          </div>
        </section>
      ))}
      <RatingModal
        openModal={openModal}
        handleClose={() => {
          setRating("?");
          setOpenModal(false);
        }}
        modalMovieIndex={modalMovieIndex}
        rating={rating}
        handleRating = {(event, newValue) => setRating(newValue)}
      />
    </>
  );
}
