import db from "../db/db.js";
import pgPromise from "pg-promise";
const pgp = pgPromise({ capSQL: true });

export default class ReviewModel {
  async create(data) {
    try {
      // Generate SQL statement - using helper for dynamic parameter injection
      const statement =
        pgp.helpers.insert(data, null, "reviews") + "RETURNING *";

      // Execute SQL statment
      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw err;
    }
  }

  async findByUserId(user_id) {
    try {
      const statement = `SELECT
      reviews.id AS review_id,
      reviews.title as review_title,
      reviews.content AS review_content,
      reviews.created_at AS review_date,
      users.username AS user_username
  FROM
      reviews
  JOIN
      users ON reviews.user_id = users.id
  WHERE
      reviews.user_id = $1`;
      const result = await db.query(statement, [user_id]);
      if (result.rows?.length) {
        return result.rows;
      }
      return [];
    } catch (err) {
      throw err;
    }
  }

  async findByMovieId(movie_id) {
    try {
      const statement = `SELECT
      reviews.id AS review_id,
      reviews.title as review_title,
      reviews.content AS review_content,
      reviews.created_at AS review_date,
      users.username AS user_username
  FROM
      reviews
  JOIN
      users ON reviews.user_id = users.id
  WHERE
      reviews.movie_id = $1`;
      const result = await db.query(statement, [movie_id]);
      if (result.rows?.length) {
        return result.rows;
      }
      return [];
    } catch (err) {
      throw err;
    }
  }

  async findOne(id) {
    try {
      const statement = `SELECT *
        FROM reviews WHERE id = $1`;
      const result = await db.query(statement, [id]);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  async update(id, data) {
    try {
      // Generate SQL statement - using helper for dynamic parameter injection
      const condition = pgp.as.format("WHERE id = $1 RETURNING *", [id]); // Replaced ${} with positional parameters
      const statement = pgp.helpers.update(data, null, "reviews") + condition;

      // Execute SQL statment
      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw err;
    }
  }

  async delete(id) {
    try {
      // Generate SQL statement
      const statement = `DELETE
                         FROM reviews
                         WHERE id = $1
                         RETURNING *`;

      // Execute SQL statment
      const result = await db.query(statement, [id]);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
}
