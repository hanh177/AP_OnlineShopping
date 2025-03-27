import store from "@/store";
import axios from "axios";
import { logout } from "@/store/slices/authSlice";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://api.example.com",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Interceptor before sending request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor after receiving response
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      // should handle refresh token and re-login instead
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default API;
