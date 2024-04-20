import db from "../db/db.js";
import pgPromise from "pg-promise";
const pgp = pgPromise({ capSQL: true });

export default class WatchlistMovieModel {
  async create(data) {
    try {
      const statement =
        pgp.helpers.insert(data, null, "watchlists_movies") + "RETURNING *";
      const result = await db.query(statement);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  async find(watchlist_id) {
    try {
      // Generate SQL statement
      const statement = `SELECT *
      FROM watchlists_movies
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

  async delete(watchlist_id, movie_id) {
    try {
      const statement = `DELETE FROM watchlists_movies WHERE watchlist_id = $1 AND movie_id = $2 RETURNING *`;
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
