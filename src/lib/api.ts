import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================================================
   AUTH TYPES
========================================================= */

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

/* =========================================================
   AUTH APIs
========================================================= */

export async function signupUser(data: SignupData) {
  const response = await api.post("/auth/signup", data);
  return response.data;
}

export async function loginUser(
  data: LoginData
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(
    "/auth/login",
    data
  );

  return response.data;
}

export async function getCurrentUser(): Promise<User> {
  const response = await api.get<User>("/users/me");
  return response.data;
}

export default api;