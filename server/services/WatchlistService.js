import createError from "http-errors";
import WatchlistModel from "../models/watchlist.js";
import WatchlistMoviesModel from "../models/watchlist-movies.js";

export default class WatchlistService {
  async create(data) {
    const { user_id } = data;
    try {
      //Instantiate new watchlist and save
      const Watchlist = new WatchlistModel();
      const watchlist = await Watchlist.create({ user_id });
      return watchlist;
    } catch (err) {
      throw err;
    }
  }

  async loadMovies(user_id) {
    try {
      // Load watchlist based on ID
      const watchlist = await WatchlistModel.findOneByUser(user_id);
      if (!watchlist) {
        throw createError(404, "Watchlist not found");
      }
      const movies = await WatchlistMoviesModel.find(watchlist.id);
      watchlist.movies = movies;
      return watchlist;
    } catch (err) {
      throw err;
    }
  }

  async addMovie(user_id, movie_id) {
    try {
      const watchlist = await WatchlistModel.findOneByUser(user_id);
      console.log(watchlist);
      if (!watchlist) {
        throw createError(404, "Watchlist not found");
      }
      const movie = await WatchlistMoviesModel.create({
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
      // Remove movie by id
      const watchlist = await WatchlistModel.findOneByUser(user_id);
      if (!watchlist) {
        throw createError(404, "Watchlist not found");
      }
      const movie = await WatchlistMoviesModel.delete(watchlist.id, movie_id);
      if (!movie) {
        throw createError(404, "Movie not found in watchlist");
      }
      return movie;
    } catch (err) {
      throw err;
    }
  }
}
