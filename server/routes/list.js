import express from "express";
const router = express.Router();
import ListService from "../services/ListService.js";
const ListServiceInstance = new ListService();

export default (app) => {
  app.use("/api/lists", router);

  router.get("/", async (req, res, next) => {});

  router.get("/:listId", async (req, res, next) => {});

  router.post("/", async (req, res, next) => {
    try {
      // Extract data from the request body
      const { title, description } = req.body;
      // Perform the database operation to add the new
      const response = await ListServiceInstance.create(title, description);

      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.put("/:listId", async (req, res, next) => {});

  router.delete("/:listId", async (req, res, next) => {});
};
