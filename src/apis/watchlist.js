import API from "./client";

export const fetchWatchlist = async () => {
  try {
    const response = await API.get("/user/watchlist");
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const addToWatchlist = async (movieId) => {
  try {
    const response = await API.post(`/movies/${movieId}`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const removeFromWatchlist = async (movieId) => {
  try {
    const response = await API.post(`/movies/${movieId}`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};
