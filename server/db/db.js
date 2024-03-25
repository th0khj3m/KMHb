"use strict"; //Activates strict mode (Stricter parsing and error handling)

import { Pool } from "postgres-pool";
import { DB } from "../config.js";

const pool = new Pool({
  connectionString: `postgres://${DB.USER}:${DB.PASSWORD}@${DB.HOST}/${DB.DATABASE}`,
});

export default {
  query: (text, params) => pool.query(text, params),
};
