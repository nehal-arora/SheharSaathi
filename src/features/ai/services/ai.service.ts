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

import {
  mockCheckScam,
  mockClearChatHistory,
  mockGetBudgetAdvice,
  mockGetChatHistory,
  mockGetLocalityRecommendations,
  mockGetPersonalizedSuggestions,
  mockSendChatMessage,
} from "@/features/ai/mock/mockAI";

export interface ClearChatHistoryResponse {
  success: boolean;
  message: string;
}

export async function sendChatMessage(
  payload: AIChatRequest
): Promise<AIChatResponse> {
  const question = payload.question.trim();

  if (!question) {
    throw new Error("Please enter a question.");
  }

  return mockSendChatMessage(question);
}

export async function getChatHistory(): Promise<ChatHistoryResponse> {
  return mockGetChatHistory();
}

export async function clearChatHistory(): Promise<ClearChatHistoryResponse> {
  return mockClearChatHistory();
}

export async function getLocalityRecommendations(
  payload: LocalityRecommendationRequest
): Promise<LocalityRecommendationResponse> {
  if (!payload.city.trim()) {
    throw new Error("Please enter a city.");
  }

  if (payload.budget <= 0) {
    throw new Error("Budget must be greater than zero.");
  }

  if (!payload.occupation.trim()) {
    throw new Error("Please enter your occupation.");
  }

  if (!payload.transport.trim()) {
    throw new Error("Please select your preferred transport.");
  }

  return mockGetLocalityRecommendations({
    ...payload,
    city: payload.city.trim(),
    occupation: payload.occupation.trim(),
    transport: payload.transport.trim(),
  });
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

  return mockCheckScam({
    content,
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

  return mockGetBudgetAdvice(payload);
}

export async function getPersonalizedSuggestions(): Promise<PersonalizedSuggestionsResponse> {
  return mockGetPersonalizedSuggestions();
}