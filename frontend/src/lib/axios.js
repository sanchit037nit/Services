import axios from "axios";

export const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8005/api" : "https://services-g207.onrender.com/api";

export const axiosinstance = axios.create({
    baseURL: BASE_URL,
    withCredentials:true,
})

