import db from "../db/db.js";
import pgPromise from "pg-promise";
const pgp = pgPromise({ capSQL: true });

export default class UserModel {
  async create(data) {
    try {
      // Generate SQL statement
      const statement = pgp.helpers.insert(data, null, "users") + "RETURNING *";
      
      // Execute SQL statement
      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw err;
    }
  }

  async findOneByUsername(username) {
    try {
      // Generate SQL statement
      const statement = `SELECT * FROM users WHERE username = $1`;

      // Execute SQL statement using pg-promise
      const result = await db.query(statement, [username]);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw err;
    }
  }

  async findOneByEmail(email) {
    try {
      // Generate SQL statement
      const statement = `SELECT * FROM users WHERE email= $1`;

      // Execute SQL statement
      const result = await db.query(statement, [email]);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw err;
    }
  }
}
