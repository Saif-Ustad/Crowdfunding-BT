import axios from "axios";

const API = axios.create({baseURL: "http://localhost:5000"});

export const login = (FormData) => API.post("/auth/login", FormData);
export const register = (FormData) => API.post("/auth/signup", FormData);