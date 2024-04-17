import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import { SESSION_SECRET } from "../config.js";

export default async (app) => {
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Parse incoming request bodies as JSON
  app.use(bodyParser.json());

  // Parse URL-encoded bodies (HTML Forms)
  //{ extended: true } parsing supports nested objects and arrays
  app.use(bodyParser.urlencoded({ extended: true }));

  app.set("trust proxy", 1);

  // Create a session
  app.use(
    session({
      secret: SESSION_SECRET, // Sign the session ID cookie
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );

  return app;
};
