import React, { useState, useEffect } from "react";
import "./home.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

// Import from store actions with TMDB API
import { fetchUpcomingMovies } from "../../store/movie/movie.actions";
import { fetchNewestTrailer } from "../../store/video/video.actions.js";
import VideoModal from "../../components/video-modal/video-modal.js";

import { selectUpcomingMovies } from "../../store/movie/movie.reducers";

export default function Home() {
  const dispatch = useDispatch();
  const upcomingMovies = Object.values(useSelector(selectUpcomingMovies));

  // Store trailers for each movie in a map
  const [trailers, setTrailers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  // Fetch data when the component mounts
  useEffect(() => {
    dispatch(fetchUpcomingMovies()).unwrap();
  }, [dispatch]);

  // Function to fetch the newest trailer for a movie
  const fetchTrailer = async (movieId) => {
    const response = await dispatch(fetchNewestTrailer(movieId)).unwrap();
    setTrailers((prevTrailers) => ({
      ...prevTrailers,
      [movieId]: response.video,
    }));
  };

  // Function to get the backdrop and poster path for a movie
  const getBackdropAndPoster = (movie) => {
    if (movie.backdrop_path && movie.poster_path) {
      return {
        backdrop: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      };
    }
    return null;
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      // Increment index, loop back to 0 if reaching the end
      return (prevIndex + 1) % upcomingMovies.length;
    });
  };

  const handleBack = () => {
    setCurrentIndex((prevIndex) => {
      // Decrement index, loop back to last in
      return (prevIndex - 1 + upcomingMovies.length) % upcomingMovies.length;
    });
  };

  const handleWatchVideos = async (movieId) => {
    if (!trailers[movieId]) {
      await fetchTrailer(movieId);
    }
    setOpenModal(true);
  };

  return (
    <section className="page-content">
      <section className="banner-container">
        {upcomingMovies.length > 0 && (
          <section className="banner-film">
            <img
              src={getBackdropAndPoster(upcomingMovies[currentIndex]).backdrop}
              alt={upcomingMovies[currentIndex].title}
              onClick={() => handleWatchVideos(upcomingMovies[currentIndex].id)}
              className="backdrop"
            />
            <img
              src={getBackdropAndPoster(upcomingMovies[currentIndex]).poster}
              alt={upcomingMovies[currentIndex].title}
              className="poster"
            />
            <Button
              className="back-button"
              onClick={handleBack}
              variant="contained"
            >
              <ArrowBackIosNew />
            </Button>
            <Button
              className="next-button"
              onClick={handleNext}
              variant="contained"
            >
              <ArrowForwardIos />
            </Button>
          </section>
        )}
      </section>

      <VideoModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        videoKey={trailers[upcomingMovies[currentIndex]?.id]?.key} // Pass the selected movie's trailer key
        videoName={trailers[upcomingMovies[currentIndex]?.id]?.name} // Pass the selected movie's trailer name
      />

      <section className="up-next-container">
        <h1> Up next </h1>
        <section></section>
      </section>
    </section>
  );
}
