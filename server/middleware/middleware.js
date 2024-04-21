// middleware.js (assuming this file exists)
function isLoggedIn(req, res, next) {
  if (req.user) {
    // Check if user object exists in the request
    next(); // If user is logged in, proceed to the route handler
  } else {
    res.status(401).send({ message: "Unauthorized" }); // Unauthorized response for unauthenticated users
  }
}

export default isLoggedIn;
