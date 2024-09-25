import axios from "axios";

export const API = axios.create({
  baseURL: `http://localhost:8000/api/`,
  // baseURL: import.meta.env.VITE_PUBLIC_API + import.meta.env.VITE_API_V,
});
