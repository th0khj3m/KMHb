"use strict"; //Activates strict mode (Stricter parsing and error handling)

import { Pool } from "postgres-pool";
import { DB } from "../config.js";

const pool = new Pool({
  connectionString: DB.CONNECTION_STRING,
});

// export const pool = new Pool({
//   user: DB.USER,
//   host: DB.HOST,
//   database: DB.DATABASE,
//   password: DB.PASSWORD,
//   port: DB.PORT,
// });

export default {
  query: (text, params) => pool.query(text, params),
};
