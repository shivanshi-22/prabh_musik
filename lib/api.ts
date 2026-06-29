import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

// Throw a descriptive startup error if the backend URL is not configured
if (!baseURL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL environment variable is missing. Please define it in your .env or .env.local file."
  );
}

const api = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Configure request interceptor to log URLs in development mode
if (process.env.NODE_ENV === "development") {
  api.interceptors.request.use(
    (config) => {
      console.info(`[API] ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

// Response interceptor returning the response object unchanged
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
