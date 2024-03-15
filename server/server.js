import express from "express";
const app = express();
import { SERVER_PORT } from "./config.js";
import loaders from './loaders/index.js';

async function startServer() {

  // Load all application
  loaders(app);

  app.listen(SERVER_PORT, () =>
    console.log(`Listening on port ${SERVER_PORT}...`)
  );
}

startServer();