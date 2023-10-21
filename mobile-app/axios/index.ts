import axios from "axios";

export const LoyoClient = axios.create({
    baseURL: "https://localhost:8000"
});
