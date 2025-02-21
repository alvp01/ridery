import axios from "axios";

const baseURL = import.meta.env.VITE_APP_BASE_API_URL;

const rideryTestClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

rideryTestClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

rideryTestClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default rideryTestClient;