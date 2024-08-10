import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const LogOut = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate("/");
    toast.success("Logout successful!");
  };

  const validateUser = () => {
    if (
      isLoggedIn &&
      !(
        window.localStorage.getItem("token") !== null &&
        window.localStorage.getItem("username") !== null
      )
    ) {
      LogOut();
    }
  };

  useEffect(() => {
    setIsLoggedIn(window.localStorage.getItem("token") !== null);
  }, []);

  return (
    <authContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        LogOut,
        validateUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
