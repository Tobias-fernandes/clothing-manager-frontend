import axios from "axios";
import { useAuthStore } from "@/store/auth.store";

export const api = axios.create({
  baseURL: "/api/proxy",
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await fetch("/api/auth/logout", { method: "POST" });
      useAuthStore.getState().clearUser();
      window.location.href = "/sign-in";
    }
    return Promise.reject(error);
  },
);
