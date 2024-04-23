import express from "express";
const router = express.Router();
import UserService from "../services/UserService.js";
const UserServiceInstance = new UserService();
import { isAuthorized, isLoggedIn } from "../middleware/middleware.js";

export default (app) => {
  app.use("/api/users", router);

  router.get("/", async (req, res, next) => {
    try {
      const users = await UserServiceInstance.loadUsers();
      res.status(200).send(users);
    } catch (err) {
      next(err);
    }
  });

  router.get(
    "/:userId",
    isLoggedIn,
    isAuthorized(["admin"]),
    async (req, res, next) => {
      try {
        const { userId } = req.params;
        // Use UserServiceInstance to fetch user data from the database
        const userData = await UserServiceInstance.get({ id: userId });
        res.status(200).send(userData);
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete("/", async (req, res, next) => {
    try {
      const data = req.body;
      const response = await UserServiceInstance.deleteUsers(data);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });
};
