import UserService from "../services/UserService.js";
const UserServiceInstance = new UserService();

// middleware.js (assuming this file exists)
const isLoggedIn = (req, res, next) => {
  if (req.user) {
    // Check if user object exists in the request
    next(); // If user is logged in, proceed to the route handler
  } else {
    res.status(401).send({ message: "Unauthorized" }); // Unauthorized response for unauthenticated users
  }
};

const isAuthorized = (allowedRoles = ["admin"]) => {
  // Optional default roles for flexibility
  return async (req, res, next) => {
    // Use async for potential database access
    if (req.user) {
      const { userId } = req.params;

      // Fetch user role data from the database (replace with your actual logic)
      try {
        const { role_name: userRole } = await UserServiceInstance.getUserRole(
          req.user
        ); // Assuming a UserService with getUserRole method
        // Check authorization based on role_id and allowed roles
        const isAuthorizedUser =
          (userRole === "user" && req.user.id === Number(userId)) ||
          allowedRoles.includes(userRole);

        if (isAuthorizedUser) {
          next(); // Allow access if authorized
        } else {
          res
            .status(403)
            .send({ message: "Forbidden: You cannot access this information" }); // Forbidden response for unauthorized users
        }
      } catch (err) {
        next(err); // Pass the error to the error handling middleware
      }
    } else {
      res.status(401).send({ message: "Unauthorized" }); // Unauthorized for unauthenticated users
    }
  };
};

export { isLoggedIn, isAuthorized };
