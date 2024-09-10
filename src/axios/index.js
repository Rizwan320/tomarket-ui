import axios from "axios";
import { getNavigate } from "./navigate";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue = [];

const refreshToken = async (error) => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error(error);
    }
    return api.post("auth/refresh", { refresh: refreshToken });
  } catch (error) {
    throw error;
  }
};

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     console.log(error);
//     console.log(error.config.url);
//     if (error.config.url == "auth/refresh" && error.request.status == 401) {
//       return Promise.reject(error);
//     }

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers["Authorization"] = `Bearer ${token}`;
//             return api(originalRequest);
//           })
//           .catch((err) => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const res = await refreshToken();
//         if (res.data.access_token) {
//           localStorage.setItem("accessToken", res.data.access_token);
//           api.defaults.headers.common["Authorization"] = `Bearer ${res.access_token}`;
//           originalRequest.headers["Authorization"] = `Bearer ${res.access_token}`;
//           processQueue(null, res.access_token);
//           return api(originalRequest);
//         }
//       } catch (refreshError) {
//         processQueue(refreshError, null);
//         localStorage.clear();
//         const navigate = getNavigate();
//         navigate("/authentication/sign-in");
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }
//     if (error.response?.status === 401) {
//       localStorage.clear();
//       const navigate = getNavigate();
//       navigate("/authentication/sign-in");
//       return Promise.reject(error);
//     }

//     return Promise.reject(error);
//   }
// );

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error?.response?.status;
    const isAuthRequest = originalRequest?.url === "auth/refresh";

    if (status === 401) {
      if (isAuthRequest && error.request.status === 401) {
        return Promise.reject(error);
      }

      if (!originalRequest?._retry) {
        originalRequest._retry = true;

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
              return api(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        isRefreshing = true;

        try {
          const res = await refreshToken(error?.response?.data?.message);
          const newToken = res?.data?.access_token;

          if (newToken) {
            localStorage.setItem("accessToken", newToken);
            api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          localStorage.clear();
          getNavigate()("/authentication/sign-in");
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
      localStorage.clear();
      getNavigate()("/authentication/sign-in");
    }

    return Promise.reject(error);
  }
);

export default api;
