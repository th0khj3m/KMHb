import db from "../db/db.js";
import pgPromise from "pg-promise";
const pgp = pgPromise({capSQL: true});

export default class WatchlistModel {
    async create(data) {
        try {
            const statement = pgp.helpers.insert(data, null, "watchlist") + "RETURNING *";
            const result = await db.query(statement);
            if (result.rows?.length) {
                return result.rows[0];
            }
            return null;
        } catch (err) {
            throw err;
        }
    }
}