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

  async find() {
    try {
      const statement = `SELECT *
                         FROM reviews`;
      const result = await db.query(statement, []);
      if (result.rows?.length) {
        return result.rows[0];
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
      const condition = pgp.as.format("WHERE id = ${id} RETURNING *", { id });
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
