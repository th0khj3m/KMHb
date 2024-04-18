import db from "../db/db.js";
import pgPromise from "pg-promise";
const pgp = pgPromise({ capSQL: true });

export default class WatchlistMoviesModel {
  static async find(watchlist_id) {
    try {
      const statement = `SELECT movie_id
                            FROM watchlist_movies
                            WHERE watchlist_id = $1`;

      const result = await db.query(statement, [watchlist_id]);
      if (result.rows?.length) {
        return result.rows;
      }
      return [];
    } catch (err) {
      throw err;
    }
  }
}
