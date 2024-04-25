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
    console.log("New client connected", socket.id);

    socket.on("join_room", async (data) => {
      const { userId, roomId } = data;
      socket.join(roomId);
      console.log(`User ${userId} joined room ${roomId}`);
      // Broadcast to the room that a new user has joined
      socket.to(roomId).emit("user_joined", userId);

      // Optionally send a welcome message or other notifications
      socket.emit("welcome", {
        message: "Welcome to the room!",
        roomId: roomId,
      });
    });

    socket.on("send_message", async (data) => {
      const { userId, roomId, content } = data;
      try {
        // Save the message to the database
        const result = await dbPool.query(
          "INSERT INTO chatroom_messages (user_id, room_id, content) VALUES ($1, $2, $3) RETURNING *",
          [userId, roomId, content]
        );

        // Emit the message to other users in the same room
        io.to(roomId).emit("receive_message", result.rows[0]);
        console.log(`Message sent in room ${roomId} by user ${userId}`);
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

  app.listen(SERVER_PORT, () =>
    console.log(`Listening on port ${SERVER_PORT}...`)
  );
}

startServer();
