import { BASE_URL } from "@/constants/constants";
import axios from "axios";

export const fetcher = axios.create({
  baseURL: BASE_URL,
});
