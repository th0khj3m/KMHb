import express from "express";
const router = express.Router();
import AuthService from "../services/AuthService.js";
const AuthServiceInstance = new AuthService();
import UserService from "../services/UserService.js";
const UserServiceInstance = new UserService();

export default (app, passport) => {
  app.use("/api/auth", router);

  // Login Endpoint
  router.post(
    "/login",
    passport.authenticate("local"),
    async (req, res, next) => {
      try {
        const { username, password } = req.body;
        const response = await AuthServiceInstance.login({
          username,
          password,
        });
        res.status(200).send(response);
      } catch (err) {
        next(err); //Forward the error to error handling middleware
      }
    }
  );

  router.get("/logout", async (req, res) => {
    req.logout();
    req.status(200).send("Logged out succesfully");
  });

  router.post("/register", async (req, res, next) => {
    try {
      const { username, password, email } = req.body;
      await AuthServiceInstance.register({
        username,
        password,
        email,
      });
      res.status(200).send();
    } catch (err) {
      next(err);
    }
  });

  router.get("/logged_in", async (req, res, next) => {
    try {
      const { id } = req.user;
      const user = await UserServiceInstance.get({ id });
      res.status(200).send({
        isLoggedIn: true,
        user,
      });
    } catch (err) {
      next(err);
    }
  });
};
