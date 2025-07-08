import React from "react";
import useAuth from "../hook/useAuth";
import { Navigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <CircularProgress size={50} color="success" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
