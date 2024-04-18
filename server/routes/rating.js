import express from "express";
const router = express.Router();
import RatingService from "../services/RatingService.js";
const RatingServiceInstance = new RatingService();

export default (app) => {
  app.use("/api", router);

  router.get("/user/ratings", async (req, res, next) => {
    try {
      const { id } = req.user;
      const response = await RatingServiceInstance.loadRatings(id);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  });

  router.post("/movies/:movieId/rate", async (req, res, next) => {
    try {
      const { id } = req.user;
      const { movieId } = req.params;
      const rating = req.body;
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
};
