import {
  mockNotificationResponse,
} from "../mock/mockNotifications";

import type {
  NotificationListResponse,
} from "../types/notification.types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://127.0.0.1:8000";

const USE_MOCK_NOTIFICATIONS = true;

function getAccessToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return (
    localStorage.getItem("access_token") ??
    localStorage.getItem("token")
  );
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

async function parseError(
  response: Response,
  fallback: string
): Promise<string> {
  try {
    const data = await response.json();

    return (
      data.detail ??
      data.message ??
      fallback
    );
  } catch {
    return fallback;
  }
}

export async function getNotifications(): Promise<NotificationListResponse> {
  if (USE_MOCK_NOTIFICATIONS) {
    await wait(600);

    return structuredClone(mockNotificationResponse);
  }

  const token = getAccessToken();

  if (!token) {
    throw new Error("Please login again.");
  }

  const response = await fetch(
    `${API_URL}/notifications`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      await parseError(
        response,
        "Unable to load notifications."
      )
    );
  }

  return response.json();
}

export async function markNotificationRead(
  notificationId: number
) {
  if (USE_MOCK_NOTIFICATIONS) {
    await wait(300);
    return;
  }

  const token = getAccessToken();

  await fetch(
    `${API_URL}/notifications/read`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        notification_id: notificationId,
      }),
    }
  );
}

export async function deleteNotification(
  notificationId: number
) {
  if (USE_MOCK_NOTIFICATIONS) {
    await wait(300);
    return;
  }

  const token = getAccessToken();

  await fetch(
    `${API_URL}/notifications/${notificationId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}