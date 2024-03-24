//Import all routes
import routeLoader from "../routes/index.js"

import swaggerLoader from "./swagger.js";

export default async (app) => {
  // Load API route handlers
  routeLoader(app);

  // Load Swagger
  swaggerLoader(app);

  // Error Handler
  app.use((err, req, res, next) => {
    const { message, status } = err;
    return res.status(status).send({ message });
  });
};
