import express from "express";
const app = express();
import { SERVER_PORT } from "./config.js";

async function startServer() {
  app.listen(SERVER_PORT, () =>
    console.log(`Listening on port ${SERVER_PORT}...`)
  );
}

startServer();