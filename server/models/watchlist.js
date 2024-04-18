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

  static async findOneByUser(user_id) {
    try {
      // Generate SQL statement
      const statement = `SELECT *
      FROM watchlist
      WHERE "user_id" = $1`;

      const result = await db.query(statement, [user_id]);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw err;
    }
  }
}
