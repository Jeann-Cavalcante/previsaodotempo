import axios from "axios";

export const Api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "X-RapidAPI-Key": process.env.EXPO_PUBLIC_KEY,
    "X-RapidAPI-Host": process.env.EXPO_PUBLIC_HOST,
  },
});
