import axios from "axios";

export const axiosinstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:8005/api" : "https://services-g207.onrender.com/api",
    withCredentials:true,
})

