import db from "../db/db.js"; //Connect database

// Define the ListService module
export default class ListService {
  async create(data) {
    const { title, description } = data;
    try {
      //Generate SQL statement
      const statement = `INSERT INTO lists (title, description) VALUES ($1, $2) RETURNING *`;
      const values = [title, description];

      // Execute SQL statment
      const newList = await db.query(statement, values);

      // Return the newly created list
      if (!newList.rows?.length) {
        throw createError(400, "Failed to create list");
      }
      return newList.rows[0];
    } catch (err) {
      throw err;
    }
  }
}
