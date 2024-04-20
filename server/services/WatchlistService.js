import WatchlistModel from "../models/watchlist.js";
const WatchlistModelInstance = new WatchlistModel();
import WatchlistMovieModel from "../models/watchlist-movie.js";
const WatchlistMovieModelInstance = new WatchlistMovieModel();

export default class WatchlistService {
  async create(user_id) {
    try {
      const watchlist = await WatchlistModelInstance.create({user_id});
      return watchlist;
    } catch (err) {
      throw err;
    }
  }

  async loadMovies(user_id) {
    try {
      // Load watchlist based on ID
      const watchlist = await WatchlistModelInstance.findOneByUser(user_id);
      // Load movies
      const movies = await WatchlistMovieModelInstance.find(watchlist.id);
      watchlist.movies = movies;
      return watchlist;
    } catch (err) {
      throw err;
    }
  }

  async addMovie(user_id, movie_id) {
    try {
      const watchlist = await WatchlistModelInstance.findOneByUser(user_id);
      const movie = await WatchlistMovieModelInstance.create({
        watchlist_id: watchlist.id,
        movie_id,
      });
      return movie;
    } catch (err) {
      throw err;
    }
  }

  async removeMovie(user_id, movie_id) {
    try {
      const watchlist = await WatchlistModelInstance.findOneByUser(user_id);
      const movie = await WatchlistMovieModelInstance.delete({
        watchlist_id: watchlist.id,
        movie_id,
      });
      return movie;
    } catch (err) {
      throw err;
    }
  }
}
