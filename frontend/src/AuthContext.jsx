// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import baseUrl from "./base";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const isAuthenticated = !!accessToken;
    setIsLoggedIn(isAuthenticated);
  }, []);

  const handleLogout = () => {
    const accessToken = localStorage.getItem("accessToken");
    // Perform the logout action
    fetch(baseUrl + "/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`, // Set the authorization header
        "Content-Type": "application/json", // Set other necessary headers if required
      },
    })
      .then((response) => {
        // Clear userData from localStorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("cartItems");
        toast.success("Logged out successfully!");
        setIsLoggedIn(false);
        // Redirect to the login page or perform other actions after logout
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
