import API from "./client";

export const fetchRatings = async () => {
  try {
    const response = await API.get("ratings");
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const getSpecificRating = async (movieId) => {
  try {
    const response = await API.get(`ratings/movies/${movieId}`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const addToRatings = async ({ movieId, rating }) => {
  try {
    const response = await API.post(`ratings/movies/${movieId}`, {
      rating,
    });
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const updateUserRating = async ({ movieId, rating }) => {
  try {
    const response = await API.put(`ratings/movies/${movieId}`, {
      rating,
    });
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const removeFromRatings = async (movieId) => {
  try {
    const response = await API.delete(`ratings/movies/${movieId}`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};
