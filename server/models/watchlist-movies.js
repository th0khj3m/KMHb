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
        return result.rows[0];
      }
      return [];
    } catch (err) {
      throw err;
    }
  }

  static async create(data) {
    try {
      const statement =
        pgp.helpers.insert(data, null, "watchlist_movies") + "RETURNING *";
      const result = await db.query(statement);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  static async delete(watchlist_id, movie_id) {
    try {
      const statement = `DELETE FROM watchlist_movies WHERE watchlist_id = $1 AND movie_id = $2 RETURNING *`;
      const result = await db.query(statement, [watchlist_id, movie_id]);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw err;
    }
  }
}
