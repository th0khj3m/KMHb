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

async function startServer() {
  // Load all application
  loaders(app);

  // Setup Swagger UI middleware
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("join_room", (data) => {
      socket.join(data.room);
      console.log(`User ${data.user} joined room ${data.room}`);
    });

    socket.on("send_message", (data) => {
      io.to(data.room).emit("received_message", data);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  app.listen(SERVER_PORT, () =>
    console.log(`Listening on port ${SERVER_PORT}...`)
  );
}

startServer();
