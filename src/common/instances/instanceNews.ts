import axios from "axios";

export const instanceNews = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_NEWS,
});
