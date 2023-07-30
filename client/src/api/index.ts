import { BASE_URL } from "@/constants/constants";
import { getToken } from "@/utils/token";
import axios from "axios";

// 인증이 필요 없는 경우
export const fetcher = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 인증이 필요한 경우
export const authFetcher = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

authFetcher.interceptors.request.use(
  config => {
    const [authorization, refresh] = getToken();

    if (authorization && refresh) {
      config.headers.Authorization = authorization;
      config.headers.Refresh = refresh;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
