import express from "express";
const router = express.Router();
import UserService from "../services/UserService.js";
const UserServiceInstance = new UserService();

export default (app) => {
  app.use("/api/users", router);

  const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  };

  router.get("/:userId", async (req, res, next) => {
    try {
      const { userId } = req.params;
      // Use UserServiceInstance to fetch user data from the database
      const userData = await UserServiceInstance.get({id: userId});
      res.status(200).send(userData);
    } catch (err) {
      next(err);
    }
  });
};
