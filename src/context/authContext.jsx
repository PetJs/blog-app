import { createContext, useState, useEffect, useContext } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem("token");
    const expiry = localStorage.getItem("tokenExpiry");

    if (savedToken && expiry && Date.now() < parseInt(expiry, 10)) {
      return savedToken;
    } else {
      // expired or missing
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("tokenExpiry");
      return null;
    }
  });

  // login function
  const login = async (email, password) => {
    const res = await API.post("/login", { email, password });

    const token = res.data.token;
    const user = res.data.user || { username: "User" }; // fallback if backend doesn't send user

    // set expiry (1 hour)
    const expiry = Date.now() + 60 * 60 * 1000;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("tokenExpiry", expiry.toString());

    setToken(token);
    setUser(user);
  };

  // register function
  const register = async (username, email, password) => {
    await API.post("/register", { username, email, password });
  };

  // logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("tokenExpiry");
    setToken(null);
    setUser(null);
  };

  // auto-logout when token expires
  useEffect(() => {
    if (!token) return;

    const expiry = localStorage.getItem("tokenExpiry");
    if (!expiry) return;

    const remainingTime = parseInt(expiry, 10) - Date.now();

    if (remainingTime <= 0) {
      logout();
    } else {
      const timer = setTimeout(() => {
        logout();
      }, remainingTime);

      return () => clearTimeout(timer); // cleanup
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
