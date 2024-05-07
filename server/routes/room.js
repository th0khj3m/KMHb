import express from "express";
const router = express.Router();
import RoomService from "../services/RoomService.js";
import { isAuthorized, isLoggedIn } from "../middleware/middleware.js";
const RoomServiceInstance = new RoomService();

export default (app) => {
  app.use("/api/rooms", isLoggedIn, router);

  router.get("/", async (req, res, next) => {
    try {
      const response = await RoomServiceInstance.loadRooms();
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.post("/", isAuthorized(), async (req, res, next) => {
    try {
      const { name } = req.body;
      const response = await RoomServiceInstance.addRoom(name);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.get("/:roomId/messages", async (req, res, next) => {
    try {
      const { roomId } = req.params;
      const response = await RoomServiceInstance.getRoomMessages(roomId);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.post("/:roomId/messages", async (req, res, next) => {
    try {
      const { roomId } = req.params;
      const { id, content } = req.user;
      const response = await RoomServiceInstance.addMessage({
        user_id: id,
        roomId,
        content,
      });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.put("/:roomId", isAuthorized(), async (req, res, next) => {
    try {
      const { roomId } = req.params;
      const { name } = req.body;
      const response = await RoomServiceInstance.updateRoom({
        room_id: roomId,
        name,
      });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:roomId", isAuthorized(), async (req, res, next) => {
    try {
      const { roomId } = req.params;
      const response = await RoomServiceInstance.deleteRoom(roomId);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });
};
