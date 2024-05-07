import db from "../db/db.js";
import pgPromise from "pg-promise";
const pgp = pgPromise({ capSQL: true });

export default class ReviewModel {
  async create(data) {
    const { user_id, movie_id, title, content } = data;
    try {
      // Generate SQL statement - using helper for dynamic parameter injection

      const statement = `
      WITH inserted AS (
        INSERT INTO reviews (user_id, movie_id, title, content)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      )
      SELECT inserted.*, users.username 
      FROM inserted
      INNER JOIN users ON inserted.user_id = users.id;`;

      // Execute SQL statment
      const result = await db.query(statement, [
        user_id,
        movie_id,
        title,
        content,
      ]);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw err;
    }
  }

  async find() {
    try {
      const statement = `SELECT reviews.*, users.username FROM reviews 
                         INNER JOIN users ON reviews.user_id = users.id 
                         WHERE status = FALSE`;
      const result = await db.query(statement);
      if (result.rows?.length) {
        return result.rows;
      }
      return [];
    } catch (err) {
      throw err;
    }
  }

  async findByUserId(user_id) {
    try {
      const statement = `SELECT
      reviews.id,
      reviews.title,
      reviews.content,
      reviews.created_at,
      reviews.movie_id,
      users.username
  FROM
      reviews
  JOIN
      users ON reviews.user_id = users.id
  WHERE
      reviews.user_id = $1 AND reviews.status = true`;
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
      reviews.id,
      reviews.title,
      reviews.content,
      reviews.created_at,
      users.username
  FROM
      reviews
  JOIN
      users ON reviews.user_id = users.id
  WHERE
      reviews.movie_id = $1 AND reviews.status = true`;
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

  async updateStatus(data) {
    try {
      const idString = data.join(",");
      const statement = `UPDATE reviews SET status = true WHERE id IN (${idString}) RETURNING *`;
      const result = await db.query(statement);
      if (result.rows?.length) {
        return result.rows;
      }
      return [];
    } catch (err) {
      throw err;
    }
  }

  async deleteReviews(data) {
    try {
      const idString = data.join(",");
      const statement = `DELETE FROM reviews WHERE id IN (${idString}) RETURNING *`;
      const result = await db.query(statement);
      if (result.rows?.length) {
        return result.rows;
      }
      return [];
    } catch (err) {
      throw err;
    }
  }

  async update(id, data) {
    try {
      const { title, content, status } = data;
      // Generate SQL statement - using helper for dynamic parameter injection
      // const condition = pgp.as.format("WHERE id = $1 RETURNING *", [id]);
      // const statement =
      //   pgp.helpers.update(data, ["title", "content", "status"], "reviews") +
      //   condition;
      const statement = `UPDATE reviews SET title=$1, content=$2, status=$3 WHERE id=$4 RETURNING *`;

      // Execute SQL statment
      const result = await db.query(statement, [title, content, status, id]);

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
