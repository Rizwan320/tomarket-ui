import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

async function refreshToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  const response = await api.post("auth/refresh", { refresh: refreshToken });
  return response.data;
}

// Request interceptor to add the Authorization header to all requests
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors and refresh the token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true; // Marking the request to avoid infinite loops

      try {
        if (localStorage.getItem("refreshToken") == null) {
          return api(originalRequest);
        }
        const res = await refreshToken();
        if (res.access_token) {
          localStorage.setItem("accessToken", res.access_token);
          api.defaults.headers.common["Authorization"] = "Bearer " + res.access_token;
          originalRequest.headers["Authorization"] = "Bearer " + res.access_token;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
