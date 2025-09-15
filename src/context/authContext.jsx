import { createContext, useState, useEffect } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      // You could add a "get current user" endpoint later
      setUser({ username: "User" }); 
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await API.post("/login", { email, password });
    const token = res.data.token;
    localStorage.setItem("token", token);
    setToken(token);
  };

  const register = async (username, email, password) => {
    await API.post("/register", { username, email, password });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
