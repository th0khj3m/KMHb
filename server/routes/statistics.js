import express from "express";
import StatisticsService from "../services/StatisticsService.js";
const StatisticsModelInstance = new StatisticsService();
const router = express.Router();

export default (app) => {
  app.use("/api/statistics", router);

  router.get("/totalOvertime", async (req, res, next) => {
    try {
      const response = await StatisticsModelInstance.fetchTotalOvertime();
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.get("/todayRatings", async (req, res, next) => {
    try {
      const response = await StatisticsModelInstance.fetchTodayRatings();
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.get("/todayReviews", async (req, res, next) => {
    try {
      const response = await StatisticsModelInstance.fetchTodayReviews();
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.get("/todayRegistrations", async (req, res, next) => {
    try {
      const response = await StatisticsModelInstance.fetchTodayRegistrations();
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });
};
