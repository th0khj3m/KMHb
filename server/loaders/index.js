import watchlist from "../routes/watchlist.js";
import swaggerLoader from "./swagger.js";

export default async (app) => {
  // Load API route handlers
  await watchlist(app);

  // Load Swagger
  await swaggerLoader(app);

  // Error Handler
  app.use((err, req, res, next) => {
    const { message, status } = err;
    return res.status(status).send({ message });
  });
};
