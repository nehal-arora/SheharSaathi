"use client";

import { useEffect, useRef } from "react";
import {
  MessageCircleMore,
  Sparkles,
  Trash2,
} from "lucide-react";

import ChatBubble from "@/components/ai/ChatBubble";
import ChatInput from "@/components/ai/ChatInput";
import TypingIndicator from "@/components/ai/TypingIndicator";

import type { AIChatMessage } from "@/features/ai/types";

interface ChatWindowProps {
  messages: AIChatMessage[];
  loading?: boolean;
  clearing?: boolean;
  onSend: (
    message: string
  ) => Promise<void> | void;
  onClear: () => Promise<void> | void;
}

export default function ChatWindow({
  messages,
  loading = false,
  clearing = false,
  onSend,
  onClear,
}: ChatWindowProps) {
  const endRef =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, loading]);

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-[#205C46]/40 bg-[#0D211B] shadow-[0_24px_70px_rgba(0,0,0,0.3)]">
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#D4A34F]/8 blur-3xl" />

      <header className="relative flex flex-col gap-4 border-b border-[#205C46]/35 bg-[#10271F]/90 px-5 py-5 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
            <MessageCircleMore className="h-6 w-6" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-[#FBFAF7]">
                Relocation Assistant
              </h2>

              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                Online
              </span>
            </div>

            <p className="mt-1 text-sm leading-6 text-[#9EAEA7]">
              Ask about housing, budgets, safety,
              transport and localities.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClear}
          disabled={
            clearing ||
            messages.length === 0
          }
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 text-sm font-semibold text-red-300 transition hover:bg-red-400/15 hover:text-red-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Trash2 className="h-4 w-4" />

          {clearing
            ? "Clearing..."
            : "Clear History"}
        </button>
      </header>

      <div className="relative h-[520px] overflow-y-auto bg-[#071512]/45 px-4 py-6 sm:px-6">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="relative flex h-24 w-24 items-center justify-center rounded-[26px] border border-[#D4A34F]/25 bg-[#D4A34F]/10 text-[#F0C86A]">
              <MessageCircleMore className="h-10 w-10" />

              <Sparkles className="absolute -right-2 -top-2 h-7 w-7 rounded-full bg-[#10271F] p-1.5 text-[#F0C86A]" />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#D4A34F]">
              AI Relocation Chat
            </p>

            <h3 className="mt-3 text-2xl font-bold text-[#FBFAF7]">
              Start Your Relocation Conversation
            </h3>

            <p className="mt-4 max-w-lg text-sm leading-7 text-[#9EAEA7] sm:text-base">
              Ask about finding housing, choosing a
              locality, planning expenses, avoiding
              rental scams or managing your move.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-2">
              {[
                "Suggest a locality",
                "Plan my budget",
                "Check a rental offer",
                "Find housing tips",
              ].map((suggestion) => (
                <span
                  key={suggestion}
                  className="rounded-full border border-[#205C46]/40 bg-[#10271F] px-3 py-2 text-xs font-semibold text-[#B8C5BF]"
                >
                  {suggestion}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                message={message}
              />
            ))}

            {loading && (
              <TypingIndicator />
            )}

            <div ref={endRef} />
          </div>
        )}
      </div>

      <footer className="relative border-t border-[#205C46]/35 bg-[#10271F]/90 p-4 backdrop-blur sm:p-5">
        <ChatInput
          loading={loading}
          onSend={onSend}
        />

        <p className="mt-3 text-center text-xs leading-5 text-[#7F9189]">
          AI guidance may contain mistakes. Verify
          property, payment, safety and legal details
          independently.
        </p>
      </footer>
    </section>
  );
}