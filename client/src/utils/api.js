import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const getMenu = () => API.get("/foods");
export const loginUser = (data) => API.post("/users/login", data);
// etc.