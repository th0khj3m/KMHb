import db from "../db/db.js";
import pgPromise from "pg-promise";
const pgp = pgPromise({ capSQL: true });

export default class RatingModel {
  async create(data) {
    try {
      const statement =
        pgp.helpers.insert(data, null, "ratings") + "RETURNING *";

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
      const statement = `SELECT * FROM ratings WHERE user_id = $1`;
      const result = await db.query(statement, [user_id]);

      if (result.rows?.length) {
        return result.rows;
      }

      return [];
    } catch (err) { 
      throw err;
    }
  }
}
