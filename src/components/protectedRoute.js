import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext.js"; // Correct import (no .js extension needed)

const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuth(); // Get the authUser from context

  // If authUser exists, render the children, otherwise redirect to /login
  return authUser ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
