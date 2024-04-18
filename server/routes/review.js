import express from "express";
const router = express.Router();
import ReviewService from "../services/ReviewService";
const ReviewServiceInstance = new ReviewService();

export default (app) => {
  app.use("/api/reviews", router);

  router.get("/", async (req, res, next) => {
    try {
        const response = await ReviewServiceInstance.list();
        res.status(200).send(response);
    } catch (err) {

    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const { title, description } = req.body;
      // Perform the database operation to add the new
      const response = await ListServiceInstance.create({ title, description });

      //Send status 200 with response
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.get("/:reviewId", async (req, res, next) => {});

  router.put("/:reviewId", async (req, res, next) => {});

  router.delete("/:reviewId", async (req, res, next) => {});
};
