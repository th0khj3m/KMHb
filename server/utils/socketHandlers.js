import RoomModel from "../models/room.js";
const RoomModelInstance = new RoomModel();

const handleConnection = (io) => {
  io.on("connection", (socket) => {
    console.log("New client connected", socket.id);

    socket.on("join_room", async (data) => {
      const { user, room } = data;
      const userId = user?.id;
      const roomId = room?.id;
      socket.join(roomId); //Join Room id
      console.log(`User ${user?.username} joined room ${room?.name}`);
      // Broadcast to the room that a new user has joined
      io.to(roomId).emit("user_joined", userId);
      // Testing sending a message immediately after joining
      // io.to(roomId).emit("receive_message", {
      //   user: "System",
      //   content: "Welcome to the room!",
      // });
    });
    socket.on("send_message", async (data) => {
      const { user, room, content } = data;
      const userId = user?.id;
      const roomId = room?.id;
      try {
        // Save the message to the database
        const result = await RoomModelInstance.createMessage({
          userId,
          roomId,
          content,
        });

        // Emit the message to other users in the same room
        io.to(roomId).emit("receive_message", {
          user_id: userId,
          user_username: user.username,
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
      const { user, room } = data;
      const userId = user?.id;
      const roomId = room?.id;
      socket.leave(roomId);
      console.log(`User ${userId} left room ${roomId}`);

      // Inform others in the room that the user has left
      socket.to(roomId).emit("user_left", user?.username);
    });
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

export default handleConnection;
