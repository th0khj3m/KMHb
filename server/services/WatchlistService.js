import createError from "http-errors";
import WatchlistModel from "../models/watchlist.js";
const WatchlistModelInstance = new WatchlistModel();

export default class WatchlistService {
  async loadMovies(user_id) {
    try {
      // Load watchlist based on ID
      const watchlist = await WatchlistModelInstance.find(user_id);
      watchlist.movies = movies;
      return watchlist;
    } catch (err) {
      throw err;
    }
  }

  async addMovie(user_id, movie_id) {
    try {
      const movie = await WatchlistModelInstance.create({
        user_id,
        movie_id,
      });
      return movie;
    } catch (err) {
      throw err;
    }
  }

  async removeMovie(user_id, movie_id) {
    try {
      const movie = await WatchlistModelInstance.delete(user_id, movie_id);
      return movie;
    } catch (err) {
      throw err;
    }
  }
}
