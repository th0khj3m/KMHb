import createError from "http-errors";
import WatchlistModel from "../models/watchlist.js";

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
}
