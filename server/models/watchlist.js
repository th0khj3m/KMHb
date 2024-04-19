import db from "../db/db.js";
import pgPromise from "pg-promise";
const pgp = pgPromise({ capSQL: true });

export default class WatchlistModel {
  async create(data) {
    try {
      const statement =
        pgp.helpers.insert(data, null, "watchlist") + "RETURNING *";
      const result = await db.query(statement);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  async find(user_id) {
    try {
      // Generate SQL statement
      const statement = `SELECT *
      FROM watchlist
      WHERE "user_id" = $1`;

      const result = await db.query(statement, [user_id]);
      if (result.rows?.length) {
        return result.rows;
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  async delete(user_id, movie_id) {
    try {
      const statement = `DELETE FROM watchlist WHERE user_id = $1 AND movie_id = $2 RETURNING *`;
      const result = await db.query(statement, [user_id, movie_id]);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw err;
    }
  }
}
