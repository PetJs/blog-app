import axios from "axios";

const API = axios.create({
  baseURL: "https://blog-backend-6ilk.onrender.com/api",
});

// Attach Token
API.interceptors.request.use((config) => {
  //console.log("👉 Final request URL:", config.baseURL + config.url);
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
