import store from "@/store";
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://api.example.com",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Interceptor before sending request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
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
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        store.dispatch({ type: "auth/logout" });
        return Promise.reject(error);
      }

      try {
        const data = await API.post("/users/auth/refresh-token", {
          refreshToken,
        });
        const { access_token, refresh_token } = data.data.metadata;

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);

        error.config.headers.Authorization = `Bearer ${access_token}`;

        return API.request(error.config);
      } catch (refreshError) {
        store.dispatch({ type: "auth/logout" });
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
