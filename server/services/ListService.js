import db from '../db/db.js'; //Connect database

// Define the ListService module
export default class ListService {
    async create(title, description) {
        try {
            // Insert the data into the database
            const newList = await db.query('INSERT INTO lists (title, description) VALUES ($1, $2) RETURNING *', [title, description]);
            
            // Return the newly created list
            return newList.rows[0]; // Assuming your database schema has a 'created_at' column
        } catch (err) {
           throw new Error(err);
        }
    }
}