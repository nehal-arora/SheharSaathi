"use client";

import { useEffect, useState } from "react";
import { Lightbulb } from "lucide-react";

import AIHeader from "@/components/ai/AIHeader";
import AILoadingState from "@/components/ai/AILoadingState";
import AIErrorState from "@/components/ai/AIErrorState";
import SuggestionCard from "@/components/ai/SuggestionCard";

import { getPersonalizedSuggestions } from "@/features/ai/services/ai.service";

import type { PersonalizedSuggestion } from "@/features/ai/types";

export default function SuggestionsPage() {
  const [suggestions, setSuggestions] = useState<
    PersonalizedSuggestion[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadSuggestions() {
    try {
      setLoading(true);
      setError("");

      const response =
        await getPersonalizedSuggestions();

      const receivedSuggestions = Array.isArray(response.items)
        ? response.items
        : Array.isArray(response.suggestions)
          ? response.suggestions
          : [];

      setSuggestions(receivedSuggestions);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load personalized suggestions."
      );

      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadSuggestions();
  }, []);

  return (
    <main className="min-h-screen bg-[#FBFAF5]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AIHeader
          badge="Smart Suggestions"
          title="Personalized recommendations for your relocation"
          description="Based on your housing, expenses, locality preferences, and activity, शहरSaathi recommends useful actions to simplify your move."
          icon={<Lightbulb className="h-7 w-7" />}
        />

        <div className="mt-8">
          {loading ? (
            <AILoadingState
              title="Generating personalized suggestions"
              description="AI is reviewing your relocation activity and preferences."
            />
          ) : error ? (
            <AIErrorState
              title="Unable to load suggestions"
              message={error}
              onRetry={loadSuggestions}
              retrying={loading}
            />
          ) : suggestions.length > 0 ? (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Recommended for you
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  These suggestions are generated according to your
                  relocation profile and recent activity.
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {suggestions.map((suggestion, index) => (
                  <SuggestionCard
                    key={`${suggestion.id}-${index}`}
                    suggestion={suggestion}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="flex min-h-[450px] flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white px-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EEF2E4] text-[#6B8E23]">
                <Lightbulb className="h-8 w-8" />
              </div>

              <h2 className="mt-5 text-xl font-semibold text-gray-900">
                No suggestions available
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                Start using housing search, locality recommendations,
                budget planning, and AI chat. Personalized suggestions
                will appear here automatically.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}