export type AIMessageRole = "user" | "assistant";

export interface AIChatMessage {
  id: string;
  role: AIMessageRole;
  content: string;
  created_at: string;
}

export interface AIChatRequest {
  question: string;
}

export interface AIChatResponse {
  answer: string;
  message?: AIChatMessage;
}

export interface ChatHistoryResponse {
  items: AIChatMessage[];
}

export interface LocalityRecommendationRequest {
  city: string;
  budget: number;
  occupation: string;
  transport: string;
}

export interface LocalityRecommendation {
  id: string;
  locality: string;
  city: string;
  average_rent: number;
  safety_score: number;
  nearby_metro: string;
  commute_summary: string;
  nearby_essentials: string[];
  pros: string[];
  cons: string[];
}

export interface LocalityRecommendationResponse {
  recommendations: LocalityRecommendation[];
}

export type ScamRiskLevel = "Low" | "Medium" | "High";

export interface ScamCheckRequest {
  content: string;
}

export interface ScamCheckResponse {
  risk: ScamRiskLevel;
  score: number;
  reasons: string[];
  safety_tips: string[];
  summary: string;
}

export interface BudgetAdviceRequest {
  monthly_income: number;
  monthly_budget: number;
  rent: number;
  food: number;
  transport: number;
  utilities: number;
  other_expenses: number;
  savings: number;
}

export interface BudgetAdviceResponse {
  advice: string;
  total_expenses: number;
  remaining_amount: number;
  savings_rate: number;
  spending_alerts: string[];
  savings_suggestions: string[];
}

export type AISuggestionType =
  | "housing"
  | "roommate"
  | "expense"
  | "budget"
  | "safety"
  | "transport"
  | "general";

export interface PersonalizedSuggestion {
  id: string;
  type: AISuggestionType;
  title: string;
  description: string;
  action_label?: string;
  action_url?: string;
}

export interface PersonalizedSuggestionsResponse {
  suggestions: PersonalizedSuggestion[];
}

export interface AIErrorResponse {
  detail: string;
}