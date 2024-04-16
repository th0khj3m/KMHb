import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
};

