import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials : true, // Use environment variable for base URL
//   timeout: 1000, // Optional: set a timeout for requests
//   headers: { 'Content-Type': 'application/json' } // Optional: set default headers

});