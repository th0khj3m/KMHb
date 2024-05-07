import express from "express";
const router = express.Router();
import ReviewService from "../services/ReviewService.js";
import { isAuthorized, isLoggedIn } from "../middleware/middleware.js";
const ReviewServiceInstance = new ReviewService();

export default (app) => {
  app.use("/api/reviews", isLoggedIn, router);

  router.get("/", isAuthorized(), async (req, res, next) => {
    try {
      const response = await ReviewServiceInstance.loadPendingReviews();
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.put("/", isAuthorized(), async (req, res, next) => {
    try {
      const { data } = req.body;
      const response = await ReviewServiceInstance.updateReviewsStatus(data);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/", isAuthorized(), async (req, res, next) => {
    try {
      const data = req.body;
      const response = await ReviewServiceInstance.rejectReviews(data);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

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
      const { title, content, status } = req.body;
      const response = await ReviewServiceInstance.updateReview(reviewId, {
        title,
        content,
        status,
      });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:reviewId", isLoggedIn, async (req, res, next) => {
    try {
      const { reviewId } = req.params;
      const response = await ReviewServiceInstance.removeReview(reviewId);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });
};
