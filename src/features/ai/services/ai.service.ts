import type {
  AIChatRequest,
  AIChatResponse,
  BudgetAdviceRequest,
  BudgetAdviceResponse,
  ChatHistoryResponse,
  LocalityRecommendationRequest,
  LocalityRecommendationResponse,
  PersonalizedSuggestionsResponse,
  ScamCheckRequest,
  ScamCheckResponse,
} from "@/features/ai/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "http://127.0.0.1:8000";

export interface ClearChatHistoryResponse {
  success: boolean;
  message: string;
}

interface BackendErrorResponse {
  detail?: string;
  message?: string;
}

function getAccessToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return (
    localStorage.getItem("access_token") ||
    localStorage.getItem("token") ||
    localStorage.getItem("auth_token")
  );
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAccessToken();

  if (!token) {
    throw new Error("Please log in to use the AI features.");
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  let responseData: unknown = null;

  try {
    responseData = await response.json();
  } catch {
    responseData = null;
  }

  if (!response.ok) {
    const errorData = responseData as BackendErrorResponse | null;

    if (response.status === 401) {
      throw new Error(
        errorData?.detail ||
          errorData?.message ||
          "Your session has expired. Please log in again."
      );
    }

    if (response.status === 403) {
      throw new Error(
        errorData?.detail ||
          errorData?.message ||
          "You are not allowed to perform this action."
      );
    }

    if (response.status === 422) {
      throw new Error(
        errorData?.detail ||
          errorData?.message ||
          "Some information is missing or invalid."
      );
    }

    if (response.status === 429) {
      throw new Error(
        errorData?.detail ||
          errorData?.message ||
          "Too many AI requests. Please try again shortly."
      );
    }

    if (response.status === 503) {
      throw new Error(
        errorData?.detail ||
          errorData?.message ||
          "The AI service is temporarily unavailable."
      );
    }

    throw new Error(
      errorData?.detail ||
        errorData?.message ||
        `Request failed with status ${response.status}.`
    );
  }

  return responseData as T;
}

export async function sendChatMessage(
  payload: AIChatRequest
): Promise<AIChatResponse> {
  const question = payload.question.trim();

  if (!question) {
    throw new Error("Please enter a question.");
  }

  if (question.length > 2000) {
    throw new Error("Your question must not exceed 2,000 characters.");
  }

  return apiRequest<AIChatResponse>("/ai/chat", {
    method: "POST",
    body: JSON.stringify({
      question,
    }),
  });
}

export async function getChatHistory(): Promise<ChatHistoryResponse> {
  return apiRequest<ChatHistoryResponse>("/ai/chat/history", {
    method: "GET",
  });
}

export async function clearChatHistory(): Promise<ClearChatHistoryResponse> {
  return apiRequest<ClearChatHistoryResponse>("/ai/chat/history", {
    method: "DELETE",
  });
}

export async function getLocalityRecommendations(
  payload: LocalityRecommendationRequest
): Promise<LocalityRecommendationResponse> {
  const city = payload.city.trim();
  const occupation = payload.occupation.trim();
  const transport = payload.transport.trim();

  if (!city) {
    throw new Error("Please enter a city.");
  }

  if (payload.budget <= 0) {
    throw new Error("Budget must be greater than zero.");
  }

  if (!occupation) {
    throw new Error("Please enter your occupation.");
  }

  if (!transport) {
    throw new Error("Please select your preferred transport.");
  }

  return apiRequest<LocalityRecommendationResponse>(
    "/ai/locality-recommendation",
    {
      method: "POST",
      body: JSON.stringify({
        city,
        budget: payload.budget,
        occupation,
        transport_preference: transport,

        // These fields are included to match the backend AI contract.
        // The current frontend form does not collect them yet.
        workplace_or_college: "",
        preferred_localities: [],
        safety_priority: "Medium",
        maximum_commute_minutes: 45,
        sharing_preference: "Any",
      }),
    }
  );
}

export async function checkScam(
  payload: ScamCheckRequest
): Promise<ScamCheckResponse> {
  const content = payload.content.trim();

  if (content.length < 20) {
    throw new Error(
      "Please enter at least 20 characters from the listing or message."
    );
  }

  if (content.length > 5000) {
    throw new Error(
      "The listing or message must not exceed 5,000 characters."
    );
  }

  return apiRequest<ScamCheckResponse>("/ai/scam-check", {
    method: "POST",
    body: JSON.stringify({
      listing_text: content,
    }),
  });
}

export async function getBudgetAdvice(
  payload: BudgetAdviceRequest
): Promise<BudgetAdviceResponse> {
  if (payload.monthly_income <= 0) {
    throw new Error("Monthly income must be greater than zero.");
  }

  if (payload.monthly_budget <= 0) {
    throw new Error("Monthly budget must be greater than zero.");
  }

  const numericFields = [
    payload.rent,
    payload.food,
    payload.transport,
    payload.utilities,
    payload.other_expenses,
    payload.savings,
  ];

  if (numericFields.some((value) => value < 0)) {
    throw new Error("Expense and savings values cannot be negative.");
  }

  return apiRequest<BudgetAdviceResponse>("/ai/budget-advisor", {
    method: "POST",
    body: JSON.stringify({
      monthly_income: payload.monthly_income,
      housing_budget: payload.monthly_budget,
      monthly_food: payload.food,
      monthly_transport: payload.transport,
      monthly_utilities: payload.utilities,
      monthly_other_expenses: payload.other_expenses,
      savings_goal: payload.savings,

      // The current frontend form does not collect these separately.
      city: "",
      locality: "",
      sharing_type: "Any",

      // Rent is sent separately in case the backend uses it while analysing
      // the user's current housing expenses.
      rent: payload.rent,
    }),
  });
}

export async function getPersonalizedSuggestions(): Promise<PersonalizedSuggestionsResponse> {
  return apiRequest<PersonalizedSuggestionsResponse>("/ai/suggestions", {
    method: "GET",
  });
}