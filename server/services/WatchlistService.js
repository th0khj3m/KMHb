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
      //Load watchlist based on ID
      const watchlist = await WatchlistModel.findOneByUser(user_id);
      const movies = await WatchlistMoviesModel.find(watchlist.id);
      watchlist.movies = movies;
      return watchlist;
    } catch (err) {}
  }
}
