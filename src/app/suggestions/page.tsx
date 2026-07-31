"use client";

import { useEffect, useState } from "react";
import {
  Lightbulb,
  Sparkles,
} from "lucide-react";

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

      const receivedSuggestions = Array.isArray(
        response.items
      )
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
    <main className="min-h-screen bg-[#071512]">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <AIHeader
          badge="Smart Suggestions"
          title="Personalized recommendations for your relocation"
          description="Based on your housing, expenses, locality preferences, and activity, शहरSaathi recommends useful actions to simplify your move."
          icon={<Lightbulb className="h-7 w-7" />}
        />

        <section className="mt-8">
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
            <div className="space-y-7">
              <section className="relative overflow-hidden rounded-[28px] border border-[#205C46]/35 bg-[#0D211B] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)] sm:p-7">
                <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#D4A34F]/8 blur-3xl" />

                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
                      <Sparkles className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4A34F]">
                        AI Recommendations
                      </p>

                      <h2 className="mt-1 text-2xl font-bold text-[#FBFAF7]">
                        Recommended for You
                      </h2>

                      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#9EAEA7]">
                        These suggestions are generated from your relocation
                        profile, preferences, and recent activity.
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex w-fit items-center rounded-full border border-[#205C46]/40 bg-[#10271F] px-4 py-2 text-sm font-semibold text-[#D6E0DB]">
                    {suggestions.length}{" "}
                    {suggestions.length === 1
                      ? "suggestion"
                      : "suggestions"}
                  </div>
                </div>
              </section>

              <div className="grid gap-6 lg:grid-cols-2">
                {suggestions.map(
                  (suggestion, index) => (
                    <SuggestionCard
                      key={`${suggestion.id}-${index}`}
                      suggestion={suggestion}
                    />
                  )
                )}
              </div>
            </div>
          ) : (
            <section className="relative flex min-h-[500px] flex-col items-center justify-center overflow-hidden rounded-[30px] border border-dashed border-[#D4A34F]/25 bg-[#0D211B] px-6 py-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
              <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4A34F]/5 blur-3xl" />

              <div className="relative flex flex-col items-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-[28px] border border-[#D4A34F]/25 bg-[#D4A34F]/10 text-[#F0C86A]">
                  <Lightbulb className="h-10 w-10" />
                </div>

                <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#D4A34F]">
                  Smart Relocation Guidance
                </p>

                <h2 className="mt-3 text-3xl font-bold text-[#FBFAF7]">
                  No Suggestions Available
                </h2>

                <p className="mt-4 max-w-lg text-sm leading-7 text-[#9EAEA7] sm:text-base">
                  Start using housing search, locality recommendations,
                  budget planning, and AI chat. Personalized suggestions
                  will appear here automatically.
                </p>

                <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#205C46]/40 bg-[#10271F] px-4 py-2 text-sm font-semibold text-[#D6E0DB]">
                  <Sparkles className="h-4 w-4 text-[#F0C86A]" />
                  Suggestions improve with activity
                </div>
              </div>
            </section>
          )}
        </section>
      </section>
    </main>
  );
}