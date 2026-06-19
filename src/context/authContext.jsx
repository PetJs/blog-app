import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Auth endpoints live at root, not under /api
const authAPI = axios.create({
  baseURL: "https://blog-backend-6ilk.onrender.com",
});

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => {
    const saved = localStorage.getItem("token");
    const expiry = localStorage.getItem("tokenExpiry");
    if (saved && expiry && Date.now() < parseInt(expiry, 10)) return saved;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("tokenExpiry");
    return null;
  });

  const login = async (email, password) => {
    const res = await authAPI.post("/admin/login", { email, password });
    const jwt = res.data.token;

    // Fetch profile to populate user object
    const meRes = await authAPI.get("/admin/me", {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    const profile = meRes.data;

    // JWT is valid 24 h — mirror that expiry locally
    const expiry = Date.now() + 24 * 60 * 60 * 1000;

    localStorage.setItem("token", jwt);
    localStorage.setItem("user", JSON.stringify(profile));
    localStorage.setItem("tokenExpiry", expiry.toString());

    setToken(jwt);
    setUser(profile);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("tokenExpiry");
    setToken(null);
    setUser(null);
  };

  // Auto-logout when the stored token expires
  useEffect(() => {
    if (!token) return;
    const expiry = localStorage.getItem("tokenExpiry");
    if (!expiry) return;
    const remaining = parseInt(expiry, 10) - Date.now();
    if (remaining <= 0) { logout(); return; }
    const timer = setTimeout(logout, remaining);
    return () => clearTimeout(timer);
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
