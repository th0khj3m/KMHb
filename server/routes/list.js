import express from "express";
const router = express.Router();

export default (app) => {
  app.use("/api/lists", router);

  router.get("/", async (req, res, next) => {});

  router.get("/:listId", async (req, res, next) => {});

  router.post("/", async (req, res, next) => {});

  router.put("/:listId", async (req, res, next) => {});

  router.delete("/:listId", async (req, res, next) => {});
};
