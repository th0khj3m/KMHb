import db from "../db/db.js";
import pgPromise from "pg-promise";
const pgp = pgPromise({ capSQL: true });

export default class RoomModel {
  async createRoom(name) {
    try {
      // Generate SQL statement - using helper for dynamic parameter injection
      const statement = pgp.helpers.insert(name, null, "rooms") + "RETURNING *";

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
      // Generate SQL statement
      const statement = `SELECT *
       FROM rooms`;

      const result = await db.query(statement);
      if (result.rows?.length) {
        return result.rows;
      }
      return [];
    } catch (err) {
      throw err;
    }
  }

  async getMessages(roomId) {
    try {
      const result = await db.query(
        `SELECT cm.*, u.username AS user_username FROM chatroom_messages AS cm
         INNER JOIN users AS u ON cm.user_id = u.id 
         WHERE cm.room_id = $1`,
        [roomId]
      );
      if (result.rows?.length) {
        return result.rows;
      }
      return [];
    } catch (err) {
      throw err;
    }
  }

  async createMessage(data) {
    try {
      const { userId, roomId, content } = data;
      const result = await db.query(
        "INSERT INTO chatroom_messages (user_id, room_id, content) VALUES ($1, $2, $3) RETURNING *",
        [userId, roomId, content]
      );
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  async update({ room_id, name }) {
    try {
      const result = await db.query(
        "UPDATE rooms SET name = $1 WHERE id = $2 RETURNING *",
        [name, room_id]
      );
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  async delete(room_id) {
    try {
      const result = await db.query(
        "DELETE FROM rooms WHERE id = $1 RETURNING *",
        [room_id]
      );
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw err;
    }
  }
}
