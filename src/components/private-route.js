import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ isAdminRoute }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const isAdmin = user && user.role_id === 1; // Good check for user existence

  return !isAuthenticated ? (
    <Navigate to="/login" replace />
  ) : isAdminRoute && !isAdmin ? (
    <Navigate to="/" replace />
  ) : (
    <Outlet />
  );
}
