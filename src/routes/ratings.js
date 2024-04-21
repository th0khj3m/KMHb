import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useFetchMovieData from "../hooks/useFetchMovieData";
import { loadRatings } from "../store/rating/rating.actions";
import UserPage from "../components/user-pages";

export default function Ratings() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const ratingMovies = useSelector((state) => state.rating.ratings);
  return <></>;
}
