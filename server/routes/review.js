import express from "express";
const router = express.Router();
import ReviewService from "../services/ReviewService.js";
import { isLoggedIn } from "../middleware/middleware.js";
const ReviewServiceInstance = new ReviewService();

export default (app) => {
  app.use("/api/reviews", isLoggedIn, router);

  router.get("/movies/:movieId", async (req, res, next) => {
    try {
      const { movieId } = req.params;
      const response = await ReviewServiceInstance.loadReviews(movieId);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.get("/:reviewId", async (req, res, next) => {
    try {
      const { reviewId } = req.params;
      const response = await ReviewServiceInstance.get(reviewId);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.post("/movies/:movieId", isLoggedIn, async (req, res, next) => {
    try {
      const { id } = req.user;
      const { movieId } = req.params;
      const { title, content } = req.body;
      const response = await ReviewServiceInstance.create({
        user_id: id,
        movie_id: movieId,
        title,
        content,
      });

      //Send status 200 with response
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.put("/:reviewId", isLoggedIn, async (req, res, next) => {
    try {
      const { reviewId } = req.params;
      const { title, content } = req.body;
      const response = await ReviewServiceInstance.update(reviewId, {
        title,
        content,
      });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:reviewId", isLoggedIn, async (req, res, next) => {
    try {
      const { reviewId } = req.params;
      const response = await ReviewServiceInstance.remove(reviewId);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });
};
