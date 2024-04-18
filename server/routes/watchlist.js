import express from "express";
const router = express.Router();
import WatchlistService from "../services/WatchlistService.js";

const WatchlistServiceInstance = new WatchlistService();

export default async (app) => {
  app.use("/api/watchlist", router);

  router.get("/", async (req, res, next) => {
    try {

    } catch (err) {
      next(err);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const { id } = req.user;
      const response = await WatchlistServiceInstance.create({ user_id: id });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/", async (req, res, next) => {});
};
