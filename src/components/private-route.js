import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ isAdminRoute }) {
  const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);

  return !isAuthenticated ? (
    <Navigate to="/login" replace />
  ) : isAdminRoute && !isAdmin ? (
    <Navigate to="/" replace />
  ) : (
    <Outlet />
  );
}
