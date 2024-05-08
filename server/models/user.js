import db from "../db/db.js";
import pgPromise from "pg-promise";
const pgp = pgPromise({ capSQL: true });
import WatchlistService from "../services/WatchlistService.js";
const WatchlistServiceInstance = new WatchlistService();

export default class UserModel {
  async create(data) {
    try {
      const statement = pgp.helpers.insert(data, null, "users") + "RETURNING *";

      // Execute SQL statement
      const result = await db.query(statement);
      if (result.rows?.length) {
        WatchlistServiceInstance.create(result.rows[0].id); //Initialize Watchlist for new user
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw err;
    }
  }

  async find() {
    try {
      // Generate SQL statement
      const statement = `SELECT * FROM users WHERE role_id <> 1;`;

      // Execute SQL statement using pg-promise
      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows;
      }
      return [];
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

  async findOneById(id) {
    try {
      // Generate SQL statement
      const statement = `SELECT * FROM users WHERE id = $1`;

      // Execute SQL statement
      const result = await db.query(statement, [id]);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw err;
    }
  }

  async findOneByRole(role_id) {
    try {
      // Generate SQL statement
      const statement = `SELECT * FROM users WHERE role_id = $1`;

      // Execute SQL statement
      const result = await db.query(statement, [role_id]);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw err;
    }
  }

  async findUserRole(id) {
    try {
      // Generate SQL statement
      const statement = `SELECT roles.role_name FROM users 
                          INNER JOIN roles ON users.role_id = roles.id WHERE users.id = $1`;

      // Execute SQL statement
      const result = await db.query(statement, [id]);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw err;
    }
  }

  async delete(data) {
    try {
      const idString = data.join(",");
      // Generate SQL statement
      const statement = `DELETE FROM users WHERE id IN (${idString}) RETURNING *
      `;
      // Execute SQL statement
      const result = await db.query(statement);
      if (result.rows?.length) {
        return result.rows;
      }

      return [];
    } catch (err) {
      throw err;
    }
  }
}
