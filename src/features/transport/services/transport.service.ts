import {
  mockNearbyTransport,
  mockTransportRoute,
} from "../mock/mockTransport";

import type {
  NearbyTransport,
  TransportRoute,
  TransportSearchRequest,
} from "../types/transport.types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://127.0.0.1:8000";

const USE_MOCK_TRANSPORT = true;

function getAccessToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return (
    localStorage.getItem("access_token") ??
    localStorage.getItem("token")
  );
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

async function getErrorMessage(
  response: Response,
  fallback: string
): Promise<string> {
  try {
    const errorData = (await response.json()) as {
      detail?: string;
      message?: string;
    };

    return (
      errorData.detail ??
      errorData.message ??
      fallback
    );
  } catch {
    return fallback;
  }
}

export async function searchTransportRoute(
  request: TransportSearchRequest
): Promise<TransportRoute> {
  if (USE_MOCK_TRANSPORT) {
    await wait(700);

    return {
      ...mockTransportRoute,
    };
  }

  const token = getAccessToken();

  if (!token) {
    throw new Error(
      "Your session has expired. Please log in again."
    );
  }

  const query = new URLSearchParams({
    city: request.city,
    from: request.from,
    to: request.to,
  });

  const response = await fetch(
    `${API_URL}/transport/routes?${query.toString()}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(
        response,
        "Unable to find a transport route."
      )
    );
  }

  return (await response.json()) as TransportRoute;
}

export async function getNearbyTransport(
  city: string,
  locality: string
): Promise<NearbyTransport[]> {
  if (USE_MOCK_TRANSPORT) {
    await wait(500);

    return [...mockNearbyTransport];
  }

  const token = getAccessToken();

  if (!token) {
    throw new Error(
      "Your session has expired. Please log in again."
    );
  }

  const query = new URLSearchParams({
    city,
    locality,
  });

  const response = await fetch(
    `${API_URL}/transport/nearby?${query.toString()}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(
        response,
        "Unable to load nearby transport."
      )
    );
  }

  return (await response.json()) as NearbyTransport[];
}