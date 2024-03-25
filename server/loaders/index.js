//Import all routes
import expressLoader from './express.js';
import routeLoader from "../routes/index.js"
import swaggerLoader from "./swagger.js";

export default async (app) => {

  // Load Express middleware
  const expressApp = await expressLoader(app);

  // Load API route handlers
  routeLoader(app);
  
  // Load Swagger
  swaggerLoader();

  // Error Handler
  app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(status).send({ message });
  });
};
