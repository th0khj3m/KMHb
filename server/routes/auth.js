import express from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";
import db from "../db/db.js";
const router = express.Router();
import AuthService from "../services/AuthService.js";
const AuthServiceInstance = new AuthService();
import UserService from "../services/UserService.js";
const UserServiceInstance = new UserService();
import WatchlistService from "../services/WatchlistService.js";
const WatchlistServiceInstance = new WatchlistService();
import UserModel from "../models/user.js";
import sendPasswordResetEmail from "../utils/email.js";
const UserModelInstance = new UserModel();

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

  router.post("/forgot-password", async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await UserModelInstance.findOneByEmail(email);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      const resetToken = crypto.randomBytes(20).toString("hex");
      const resetTokenExpires = new Date(Date.now() + 3600000).toISOString(); // Convert to ISO string

      // Update the user record in the database with the reset token and expiration time
      const updateQuery =
        "UPDATE users SET reset_token = $1, reset_token_expires = $2 WHERE email = $3";
      await db.query(updateQuery, [resetToken, resetTokenExpires, email]);

      // Send password reset email
      await sendPasswordResetEmail(user.email, resetToken);

      res.status(200).send({ message: "Password reset email sent" });
    } catch (err) {
      next(err);
    }
  });

  // Reset password route
  router.post("/reset-password/:token", async (req, res, next) => {
    try {
      const { token } = req.params;
      const { newPassword } = req.body;
      // Check if the token exists in the database and is not expired
      const queryText =
        "SELECT * FROM users WHERE reset_token = $1 AND reset_token_expires > $2";
      const result = await db.query(queryText, [token, new Date()]);
      const user = result.rows[0];
      if (!user) {
        return res
          .status(400)
          .send({ message: "Invalid or expired reset token" });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password in the database and clear the reset token and expiration
      const updateQuery =
        "UPDATE users SET password_hash = $1, reset_token = NULL, reset_token_expires = NULL WHERE id = $2";
      await pool.query(updateQuery, [hashedPassword, user.id]);
    } catch (err) {
      next(err);
    }
  });

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
