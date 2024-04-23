import express from "express";
const router = express.Router();
import AuthService from "../services/AuthService.js";
const AuthServiceInstance = new AuthService();
import UserService from "../services/UserService.js";
const UserServiceInstance = new UserService();
import WatchlistService from "../services/WatchlistService.js";
const WatchlistServiceInstance = new WatchlistService();

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
        res.status(200).send(user);
      } catch (err) {
        next(err); //Forward the error to error handling middleware
      }
    }
  );

  router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    async (req, res) => {
      res.redirect("/");
    }
  );

  // Facebook Login Endpoint
  router.get("/facebook", passport.authenticate("facebook"));

  // Facebook Login Callback Endpoint
  router.get(
    "/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/login" }),
    async (req, res) => {
      res.redirect("/");
    }
  );

  router.get("/logout", async (req, res, next) => {
    try {
      req.logout(() => {
        res.status(200).send("Logged out successfully");
      });
    } catch (err) {
      next(err);
    }
  });

  router.post("/register", async (req, res, next) => {
    try {
      const { username, password, email } = req.body;
      const user = await AuthServiceInstance.register({
        username,
        password,
        email,
      });
      await WatchlistServiceInstance.create(user.id);
      res.status(200).send(user);
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
