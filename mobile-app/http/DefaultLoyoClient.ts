import axios from "axios";

const DefaultLoyoClient = axios.create({
    baseURL: "http://10.0.2.2:8000", // 10.0.2.2 for android emulator
});

export default DefaultLoyoClient;