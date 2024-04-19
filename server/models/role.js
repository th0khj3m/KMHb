import db from "../db/db.js";
import pgPromise from "pg-promise";
const pgp = pgPromise({ capSQL: true });

export default class RoleModel {
  static async createDefaultRoles() {
    try {
      // Check if the roles table is empty
      const result = await db.query(`SELECT COUNT(*) FROM roles`);
      const rowCount = parseInt(result.rows[0].count);
      if (rowCount > 0) {
        return;
      }
      // Array of objects representing the rows to insert
      const data = ["admin", "user"];
      const statement = `INSERT INTO roles (role_name) VALUES ($1), ($2)`;

      // Execute SQL statment
      await db.query(statement, [data[0], data[1]]);
    } catch (err) {
      throw err;
    }
  }
}
