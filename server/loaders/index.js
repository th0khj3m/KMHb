//Import all routes
import expressLoader from './express.js';
import routeLoader from "../routes/index.js"
import swaggerLoader from "./swagger.js";
import passportLoader from './passport.js';
import RoleModel from '../models/role.js';

export default async (app) => {

  // Load Express middleware
  const expressApp = await expressLoader(app);

  // Load passport middleware in intialized Express app
  const passport = await passportLoader(expressApp);
  
  // Load API route handlers
  routeLoader(app, passport);

  // Load roles
  RoleModel.createDefaultRoles();
  
  // Load Swagger
  swaggerLoader();

  // Error Handler
  app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(status).send({ message });
  });
};
