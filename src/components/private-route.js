import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ isAdminRoute, children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const isAdmin = user?.role_id === 1 ? true : false;
  if (isAuthenticated) {
    // If it's an admin route and the user is not an admin, redirect to home
    if (isAdminRoute && !isAdmin) {
      return <Navigate to="/" />;
    }
    return children;
  } else {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }
}
