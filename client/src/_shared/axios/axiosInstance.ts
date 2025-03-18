import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // Permite envio e recebimento de cookies httponly
});

export default axiosInstance;
