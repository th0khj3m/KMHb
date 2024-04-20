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

  async findOneByUser({ user_id, movie_id }) {
    try {

      const statement = `SELECT * FROM ratings WHERE user_id = $1 AND movie_id = $2`;
      const result = await db.query(statement, [user_id, movie_id]);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw err;
    }
  }
  
  async update({ rating, user_id, movie_id }) {
    try {
      const statement = `UPDATE ratings SET rating = $1 WHERE user_id = $2 AND movie_id = $3 RETURNING *`;
      const result = await db.query(statement, [rating, user_id, movie_id]);
      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw err;
    }
  }

  async delete({ user_id, movie_id }) {
    try {
      const statement = `DELETE FROM ratings WHERE user_id = $1 AND movie_id = $2 RETURNING *`;
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
