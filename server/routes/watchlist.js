import express from "express";
const router = express.Router();
import WatchlistService from "../services/WatchlistService.js";

const WatchlistServiceInstance = new WatchlistService();

export default (app) => {
  app.use("/api", router);

  router.get("/user/watchlist", async (req, res, next) => {
    try {
      const { id } = req.user;
      const response = await WatchlistServiceInstance.loadMovies(id);

      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.post("/movies/:movieId", async (req, res, next) => {
    try {
      const { id } = req.user;
      const { movieId } = req.params;
      const response = await WatchlistServiceInstance.addMovie(id, movieId);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/movies/:movieId", async (req, res, next) => {
    try {
      const { id } = req.user;
      const { movieId } = req.params;
      const response = await WatchlistServiceInstance.removeMovie(id, movieId);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });
};
