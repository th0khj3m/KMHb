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
        "SELECT * FROM chatroom_messages WHERE room_id = $1",
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
}
