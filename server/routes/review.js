import express from "express";
const router = express.Router({ mergeParams: true });
import ReviewService from "../services/ReviewService.js";
const ReviewServiceInstance = new ReviewService();

export default (app) => {
  app.use("/api/:movieId/reviews", router);

  router.get("/", async (req, res, next) => {
    try {
      const { movieId } = req.params;
      const response = await ReviewServiceInstance.list(movieId);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const { id } = req.user;
      const { movieId } = req.params;
      const { title, content } = req.body;

      const response = await ReviewServiceInstance.create({
        movie_id: movieId,
        user_id: id,
        title,
        content,
      });

      //Send status 200 with response
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

  router.put("/:reviewId", async (req, res, next) => {
    try {
      const { reviewId } = req.params;
      const data = req.body;
      const response = await ReviewServiceInstance.update(reviewId, data);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:reviewId", async (req, res, next) => {
    try {
      const { reviewId } = req.params;
      const response = await ReviewServiceInstance.remove(reviewId);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });
};
