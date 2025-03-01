import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.NODE === "development"
      ? "http://localhost:5002/api"
      : "/api",
  withCredentials: true,
});

export default axiosInstance;
