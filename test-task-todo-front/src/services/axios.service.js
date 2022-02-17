import axios from "axios";

const API_BASE_URL =
  process.env.VUE_APP_API_BASE_URL || "http://localhost:3000";

const axiosService = axios.create({
  baseURL: API_BASE_URL,
});

axiosService.interceptors.request.use((config) => {
  const userAuthData = JSON.parse(localStorage.getItem("userAuthData"));
  if (userAuthData) {
    config.headers.Authorization = `Basic ${userAuthData}`;
  }
  return config;
});

export default axiosService;
