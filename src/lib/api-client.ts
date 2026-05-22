import Axios from "axios";
import { toast } from "sonner"

export const api = Axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message;
    toast.error(message)

    return Promise.reject(error);
  },
);
