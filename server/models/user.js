import db from "../db/db.js";
import pgPromise from "pg-promise";
const pgp = pgPromise({ capSQL: true });

export default class UserModel {
  async create(data) {
    try {
      const statement = data.google
        ? pgp.helpers.insert(
            { google: data.google, role_id: data.role_id },
            null,
            "users"
          ) + "RETURNING *"
        : pgp.helpers.insert(
            data,
            ["username", "email", "password_hash"],
            "users"
          ) + "RETURNING *";

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

  async find() {
    try {
      // Generate SQL statement
      const statement = `SELECT * FROM users`;

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

  async findOneByGoogleId(id) {
    try {
      const statement = `SELECT * FROM users WHERE google ->> 'id' = $1`;
      const result = await db.query(statement, [id]);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw err;
    }
  }

  async findOneByFacebookId(id) {
    try {
      // Generate SQL statement
      const statement = `SELECT *
                         FROM users
                         WHERE facebook ->> 'id' = $1`;
      const values = [id];

      // Execute SQL statment
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error(err);
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

      return null;
    } catch (err) {
      throw err;
    }
  }
}
