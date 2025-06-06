import React from "react";
import useAuth from "../hook/useAuth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
