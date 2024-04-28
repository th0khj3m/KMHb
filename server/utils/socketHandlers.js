import RoomModel from "../models/room.js";
const RoomModelInstance = new RoomModel();

const handleConnection = (io) => {
  io.on("connection", (socket) => {
    console.log("New client connected", socket.id);

    socket.on("join_room", async (data) => {
      const { userId, roomId } = data;
      socket.join(roomId); //Join Room id
      console.log(`User ${userId} joined room ${roomId}`);
      // Broadcast to the room that a new user has joined
      io.to(roomId).emit("user_joined", userId);
      // Testing sending a message immediately after joining
      // io.to(roomId).emit("receive_message", {
      //   user: "System",
      //   content: "Welcome to the room!",
      // });
    });
    socket.on("send_message", async (data) => {
      const { userId, roomId, content } = data;
      try {
        // Save the message to the database
        const result = await RoomModelInstance.createMessage(data);

        // Emit the message to other users in the same room
        io.to(roomId).emit("receive_message", {
          user_id: userId,
          content,
        });
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
    socket.on("leave_room", async (data) => {
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
};

export default handleConnection;
