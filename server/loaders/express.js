import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import { SESSION_SECRET } from "../config.js";
import pgSession from "connect-pg-simple"; // Import connect-pg-simple
const pgSessionStore = pgSession(session);
import pg from "pg";

export default async (app) => {
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors({ credentials: true, origin: "http://localhost:3006" }));

  // Parse incoming request bodies as JSON
  app.use(bodyParser.json());

  // Parse URL-encoded bodies (HTML Forms)
  //{ extended: true } parsing supports nested objects and arrays
  app.use(bodyParser.urlencoded({ extended: true }));

  const pool = new pg.Pool({
    connectionString: "postgres://khiem:TooWild147258@@localhost/KMHb",
  });

  app.set("trust proxy", 1);

  // Create a session
  app.use(
    session({
      store: new pgSessionStore({
        pool: pool,
        tableName: "session",
      }),
      secret: SESSION_SECRET, // Sign the session ID cookie
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax", // Add sameSite attribute to mitigate CSRF attacks
        // Add the Partitioned attribute to address the warning
        partition: "none",
      },
    })
  );

  return app;
};
