// ProtectedRoute.js
import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // Import your AuthContext

const ProtectedRoute = ({ element, ...props }) => {
  const { isLoggedIn } = useContext(AuthContext); // Get authentication status from context

  return isLoggedIn ? (
    <Route {...props} element={element} />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
