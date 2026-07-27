"use client";

import { useEffect, useRef } from "react";
import { MessageCircleMore, Trash2 } from "lucide-react";

import ChatBubble from "@/components/ai/ChatBubble";
import ChatInput from "@/components/ai/ChatInput";
import TypingIndicator from "@/components/ai/TypingIndicator";
import type { AIChatMessage } from "@/features/ai/types";

interface ChatWindowProps {
  messages: AIChatMessage[];
  loading?: boolean;
  clearing?: boolean;
  onSend: (message: string) => Promise<void> | void;
  onClear: () => Promise<void> | void;
}

export default function ChatWindow({
  messages,
  loading = false,
  clearing = false,
  onSend,
  onClear,
}: ChatWindowProps) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, loading]);

  return (
    <section className="overflow-hidden rounded-3xl border border-gray-200 bg-[#FBFAF5] shadow-sm">
      <div className="flex flex-col gap-4 border-b border-gray-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EEF2E4] text-[#6B8E23]">
            <MessageCircleMore className="h-5 w-5" />
          </div>

          <div>
            <h2 className="font-semibold text-gray-900">
              Relocation Assistant
            </h2>

            <p className="text-sm text-gray-500">
              Ask about housing, budget, safety, transport, and localities.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClear}
          disabled={clearing || messages.length === 0}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Trash2 className="h-4 w-4" />
          {clearing ? "Clearing..." : "Clear history"}
        </button>
      </div>

      <div className="h-[520px] overflow-y-auto px-4 py-6 sm:px-6">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF2E4] text-[#6B8E23]">
              <MessageCircleMore className="h-7 w-7" />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              Start your relocation conversation
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
              Ask a question about finding housing, selecting a locality,
              planning expenses, avoiding rental scams, or managing your move.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                message={message}
              />
            ))}

            {loading ? <TypingIndicator /> : null}

            <div ref={endRef} />
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 bg-white p-4 sm:p-5">
        <ChatInput
          loading={loading}
          onSend={onSend}
        />

        <p className="mt-3 text-center text-xs text-gray-400">
          AI guidance may contain mistakes. Verify property, payment, safety,
          and legal details independently.
        </p>
      </div>
    </section>
  );
}