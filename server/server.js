import express from "express";
const app = express();
import { SERVER_PORT } from "./config.js";
import loaders from "./loaders/index.js";

//Swagger UI and document
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger_ouput.json" assert { type: "json" };

async function startServer() {
  // Load all application
  loaders(app);

  // Setup Swagger UI middleware
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.listen(SERVER_PORT, () =>
    console.log(`Listening on port ${SERVER_PORT}...`)
  );
}

startServer();
