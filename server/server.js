import express from "express";
const app = express();
import http from "http";
const server = http.createServer(app);
import { Server } from "socket.io";
const io = new Server(server, { cors: { origin: "*" } });
import { SERVER_PORT } from "./config.js";
import loaders from "./loaders/index.js";

//Swagger UI and document
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger_output.json" assert { type: "json" };
import handleConnection from "./utils/socketHandlers.js";

async function startServer() {
  // Load all application
  loaders(app);

  handleConnection(io);

  // Setup Swagger UI middleware
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


  server.listen(SERVER_PORT, () =>
    console.log(`Listening on port ${SERVER_PORT}...`)
  );
}

startServer();
