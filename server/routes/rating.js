import express from "express";
const router = express.Router();
import RatingService from "../services/RatingService.js";
import { isLoggedIn } from "../middleware/middleware.js";
const RatingServiceInstance = new RatingService();

export default (app) => {
  app.use("/api/ratings", isLoggedIn, router);

  router.get("/", async (req, res, next) => {
    try {
      const { id } = req.user;
      const response = await RatingServiceInstance.loadRatings(id);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  });

  router.get("/movies/:movieId/average", async (req, res, next) => {
    try {
      const { movieId } = req.params;
      const response = await RatingServiceInstance.calculateAverageRating(
        movieId
      );
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.get("/movies/:movieId", async (req, res, next) => {
    try {
      const { id } = req.user;
      const { movieId } = req.params;
      const response = await RatingServiceInstance.get({
        user_id: id,
        movie_id: movieId,
      });
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  });

  router.post("/movies/:movieId", async (req, res, next) => {
    try {
      const { id } = req.user;
      const { movieId } = req.params;
      const { rating } = req.body;
      const response = await RatingServiceInstance.rate({
        user_id: id,
        movie_id: movieId,
        rating,
      });
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  });

  router.put("/movies/:movieId", async (req, res, next) => {
    try {
      const { id } = req.user;
      const { movieId } = req.params;
      const { rating } = req.body;
      const response = await RatingServiceInstance.updateRating({
        user_id: id,
        movie_id: movieId,
        rating,
      });
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/movies/:movieId", async (req, res, next) => {
    try {
      const { id } = req.user;
      const { movieId } = req.params;
      const response = await RatingServiceInstance.removeRating({
        user_id: id,
        movie_id: movieId,
      });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });
};
