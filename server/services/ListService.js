import db from "../db/db.js"; //Connect database

// Define the ListService module
export default class ListService {
  async create(title, description) {
    try {
      // Insert the data into the database
      const result = await db.query(
        "INSERT INTO lists (title, description) VALUES ($1, $2) RETURNING *",
        [title, description]
      );

      // Return the newly created list
      if (result.rows?.length) {
        return newList.rows[0]; //Retrieve the first row from the array of rows
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
}
