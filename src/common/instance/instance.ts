import axios from "axios";
import { apiKey } from "common/instance/apiKey";
import * as process from "node:process";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": apiKey,
  },
});

// "https://social-network.samuraijs.com/api/1.0/"
