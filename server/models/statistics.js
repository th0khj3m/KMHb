import db from "../db/db.js";
import pgPromise from "pg-promise";
const pgp = pgPromise({ capSQL: true });

export default class StatisticsModel {
  async findTotalOvertime() {
    try {
      const statement = `SELECT 'rating' AS type, DATE(rated_at) AS time_period, COUNT(id) AS count
      FROM ratings
      GROUP BY DATE(rated_at)
      UNION ALL
      SELECT 'review' AS type, DATE(created_at) AS time_period, COUNT(id) AS count
      FROM reviews
      GROUP BY DATE(created_at)
      UNION ALL
      SELECT 'user' AS type, DATE(created_at) AS time_period, COUNT(id) AS count
      FROM users
      GROUP BY DATE(created_at)
      ORDER BY time_period, type;`;
      const result = await db.query(statement);
      if (result.rows?.length) {
        return result.rows;
      }
      return [];
    } catch (err) {
      throw err;
    }
  }

  async findTodayRatings() {
    try {
      const statement = `SELECT COUNT(*) AS total_ratings
      FROM ratings
      WHERE DATE(rated_at) = CURRENT_DATE`;
      const result = await db.query(statement);
      if (result.rows?.length) {
        return result.rows;
      }
      return [];
    } catch (err) {
      throw err;
    }
  }

  async findTodayReviews() {
    try {
      const statement = `SELECT COUNT(*) AS total_reviews
      FROM reviews
      WHERE DATE(created_at) = CURRENT_DATE`;
      const result = await db.query(statement);
      if (result.rows?.length) {
        return result.rows;
      }
      return [];
    } catch (err) {
      throw err;
    }
  }

  async findTodayRegistrations() {
    try {
      const statement = `SELECT COUNT(*) AS total_registrations
      FROM users
      WHERE DATE(created_at) = CURRENT_DATE`;
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
