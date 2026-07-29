import type { DashboardData } from "../types/dashboard.types";
import { mockDashboardData } from "../mock/mockDashboard";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ??
  "http://127.0.0.1:8000"
).replace(/\/+$/, "");

const USE_MOCK_DASHBOARD = false;

function getAccessToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedToken =
    localStorage.getItem("access_token") ??
    localStorage.getItem("token");

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

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

export async function getDashboardData(): Promise<DashboardData> {
  if (USE_MOCK_DASHBOARD) {
    await wait(700);
    return mockDashboardData;
  }

  const token = getAccessToken();

  if (!token) {
    throw new Error(
      "Your session has expired. Please log in again."
    );
  }

  const response = await fetch(`${API_URL}/dashboard/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    let message = "Unable to load dashboard information.";

    try {
      const errorData = (await response.json()) as {
        detail?: string;
        message?: string;
      };

      message =
        errorData.detail ??
        errorData.message ??
        message;
    } catch {
      // Keep the default error message.
    }

    if (response.status === 401) {
      message =
        "Your session has expired. Please log in again.";
    }

    throw new Error(message);
  }

  return (await response.json()) as DashboardData;
}