import API from "./client";

export const fetchReviews = async (movieId) => {
  try {
    const response = await API.get(`reviews/movies/${movieId}`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const getSpecificReview = async (reviewId) => {
  try {
    const response = await API.get(`reviews/${reviewId}`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const add = async ({ movieId, data }) => {
  try {
    const response = await API.post(`reviews/movies/${movieId}`, data);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const update = async (reviewId, data) => {
  try {
    const response = await API.put(`reviews/${reviewId}`, data);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const remove = async (reviewId) => {
  try {
    const response = await API.delete(`reviews/${reviewId}`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};
