import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { env } from "./env";

// axios instance for all api calls, where I include my apibaseurl, and can intercept request and response
export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to send access token for every request being make
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem("accessToken"); //Remember to get accesstoken from memory via authstore
    // Check if access token exist
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // Set access token in header for every api calls/request
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor to intercept response coming from server, and set new accessToken if expired
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Write code to execute (Eithere to get new accesstoken or to get new refresh token)
      window.location.href = "/login"; // Navigate to login
    }

    return Promise.reject(error);
  }
);
