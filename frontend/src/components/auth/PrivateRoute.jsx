import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <Route {...rest} element={<Element />} />
  ) : (
    <Navigate to="/login" />
  );
};
export default PrivateRoute;
