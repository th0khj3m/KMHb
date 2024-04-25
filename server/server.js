import express from "express";
const app = express();
import http from "http";
const server = http.createServer(app);
import { Server } from "socket.io";
const io = new Server(server, { cors: { origin: "*" } });
import { SERVER_PORT } from "./config.js";
import loaders from "./loaders/index.js";
import RoomModel from "./models/room.js";
const RoomModelInstance = new RoomModel();

//Swagger UI and document
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger_output.json" assert { type: "json" };

async function startServer() {
  // Load all application
  loaders(app);

  // Setup Swagger UI middleware
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  io.on("connection", (socket) => {
    console.log("New client connected", socket.id);

    socket.on("join_room", async (data) => {
      const { userId, roomId } = data;
      socket.join(roomId); //Join Room id
      console.log(`User ${userId} joined room ${roomId}`);
      // Broadcast to the room that a new user has joined
      io.to(roomId).emit("user_joined", userId);
      // Testing sending a message immediately after joining
      io.to(roomId).emit("receive_message", {
        user: "System",
        content: "Welcome to the room!",
      });
    });

    socket.on("send_message", async (data) => {
      const { userId, roomId, content } = data;
      try {
        // Save the message to the database
        const result = await RoomModelInstance.createMessage(data);

        // Emit the message to other users in the same room
        io.to(roomId).emit("receive_message", {content: result.content});
        console.log(
          `Message sent in room ${roomId} by user ${userId} is ${result.content}`
        );
      } catch (err) {
        console.error("Database error:", err);
        socket.emit("error", {
          error: "Database error while sending message.",
          details: err.message,
        });
      }
    });

    socket.on("leave_room", (data) => {
      const { userId, roomId } = data;
      socket.leave(roomId);
      console.log(`User ${userId} left room ${roomId}`);

      // Inform others in the room that the user has left
      socket.to(roomId).emit("user_left", userId);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  server.listen(SERVER_PORT, () =>
    console.log(`Listening on port ${SERVER_PORT}...`)
  );
}

startServer();
