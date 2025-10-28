import axios from 'axios';

// This is the base URL of your backend API
const API_URL = '/api'; 

const axiosInstance = axios.create({
  baseURL: API_URL
});

/**
 * Request Interceptor
 * This function runs BEFORE every request is sent.
 * It grabs the token from localStorage and adds it to the headers.
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Add the token as a 'Bearer' token to the Authorization header
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // Add no-cache header to all GET requests
    if (config.method === 'get') {
      config.headers['Cache-Control'] = 'no-cache';
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 */
axiosInstance.interceptors.response.use(
  (response) => response, // Simply return successful responses
  (error) => {
    // We re-throw the error so the .catch() block in our components
    // can handle it (e.g., call logout() on 401).
    return Promise.reject(error);
  }
);

export default axiosInstance;

