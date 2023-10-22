import axios from "axios";

const DefaultLoyoClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

export default DefaultLoyoClient;
