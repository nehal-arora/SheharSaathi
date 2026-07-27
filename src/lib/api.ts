import axios from "axios";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000"
).replace(/\/+$/, "");

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Reads and cleans the token stored in localStorage.
 *
 * Handles accidental values such as:
 * "eyJ..."
 * Bearer eyJ...
 * extra spaces
 */
function getStoredAccessToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedToken = localStorage.getItem("access_token");

  if (!storedToken) {
    return null;
  }

  const cleanedToken = storedToken
    .trim()
    .replace(/^["']|["']$/g, "")
    .replace(/^Bearer\s+/i, "")
    .trim();

  return cleanedToken || null;
}

api.interceptors.request.use(
  (config) => {
    const requestUrl = config.url ?? "";

    const isAuthRequest =
      requestUrl.includes("/auth/login") ||
      requestUrl.includes("/auth/signup");

    /*
     * Never attach an old token to login or signup.
     */
    if (!isAuthRequest) {
      const token = getStoredAccessToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        delete config.headers.Authorization;
      }
    } else {
      delete config.headers.Authorization;
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
  /*
   * Remove any expired token before making the login request.
   */
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  }

  const response = await api.post<LoginResponse>(
    "/auth/login",
    data
  );

  const rawToken = response.data.access_token;

  if (!rawToken || typeof rawToken !== "string") {
    throw new Error(
      "The backend did not return a valid access token."
    );
  }

  /*
   * Store only the raw JWT, without quotes or Bearer.
   */
  const cleanToken = rawToken
    .trim()
    .replace(/^["']|["']$/g, "")
    .replace(/^Bearer\s+/i, "")
    .trim();

  if (!cleanToken) {
    throw new Error(
      "The backend returned an empty access token."
    );
  }

  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", cleanToken);
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );
  }

  return {
    ...response.data,
    access_token: cleanToken,
  };
}

export async function getCurrentUser(): Promise<User> {
  const response = await api.get<User>("/users/me");
  return response.data;
}

export function logoutUser(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
}

export default api;