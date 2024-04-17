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
        const user = await AuthServiceInstance.login({
          username,
          password,
        });
        req.session.user = user;
        res.status(200).send(req.session.user);
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
      if (req.session.user) {
        const user = await UserServiceInstance.get({ id: req.session.user.id });
        res.status(200).send({
          isLoggedIn: true,
          user,
        });
      } else {
        // If user session does not exist, send back isLoggedIn: false
        res.status(200).send({ isLoggedIn: false });
      }
    } catch (err) {
      next(err);
    }
  });
};
