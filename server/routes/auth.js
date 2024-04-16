import express from "express";
const router = express.Router();
import AuthService from "../services/AuthService.js";
const AuthServiceInstance = new AuthService();

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

  router.get('/logout', async (req, res) => {
    req.logout();
    req.status(200).send("Logged out succesfully");
  })

  router.post("/register", async (req, res, next) => {
    try {
      const { username, password, email } = req.body;
      const response = await AuthServiceInstance.register({
        username,
        password,
        email,
      });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });
};
