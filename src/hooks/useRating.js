// import React, { useState } from "react";
// import { Rating } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { addRating, updateRating } from "../store/rating/rating.actions";

// export default function useRating() {
//   const dispatch = useDispatch();
//   const [rating, setRating] = useState("?");

//   const handleRatingChange = (event, newValue) => {
//     setRating(newValue);
//   };

//   const handleRatingConfirm = (movieId) => {
//     dispatch(addRating({ movieId, rating }));
//     setRating("?");
//   };

//   const handleRatingUpdate = (movieId) => {
//     console.log(movieId);
//     console.log(rating);
//     // dispatch(updateRating({ movieId, rating }));
//     // setRating("?");
//   };

//   return {
//     ratingComponent: (
//       <Rating
//         name="rating"
//         max={10}  
//         precision={1}
//         size="large"
//         value={rating}
//         onChange={handleRatingChange}
//         sx={{ marginBottom: "15px", color: "main" }}
//       />
//     ),
//     rating,
//     handleRatingChange,
//     handleRatingConfirm,
//     handleRatingUpdate,
//   };
// }
