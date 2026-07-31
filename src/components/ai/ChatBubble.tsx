"use client";

import { useState } from "react";
import { Bot, Check, Copy, UserRound } from "lucide-react";

import type { AIChatMessage } from "@/features/ai/types";

interface ChatBubbleProps {
  message: AIChatMessage;
}

export default function ChatBubble({
  message,
}: ChatBubbleProps) {
  const [copied, setCopied] = useState(false);

  const isUser = message.role === "user";

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(
        message.content
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error(
        "Unable to copy AI response:",
        error
      );
    }
  }

  return (
    <div
      className={`flex gap-4 ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A] shadow-md">
          <Bot className="h-6 w-6" />
        </div>
      )}

      <div
        className={`relative max-w-[90%] rounded-[24px] px-5 py-4 shadow-lg transition-all sm:max-w-[78%] ${
          isUser
            ? "rounded-br-lg bg-gradient-to-br from-[#205C46] to-[#123126] text-white border border-[#2E7A5E]"
            : "rounded-bl-lg border border-[#205C46]/40 bg-[#0D211B] text-[#F5F5F5]"
        }`}
      >
        {!isUser && (
          <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-[#D4A34F]/5 blur-2xl" />
        )}

        <p className="relative whitespace-pre-wrap text-sm leading-7">
          {message.content}
        </p>

        <div
          className={`relative mt-4 flex items-center justify-between text-xs ${
            isUser
              ? "text-white/70"
              : "text-[#9EAEA7]"
          }`}
        >
          <span>
            {new Date(
              message.created_at
            ).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>

          {!isUser && (
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 rounded-full border border-[#205C46]/40 bg-[#123126] px-3 py-1 font-medium text-[#D4A34F] transition hover:border-[#D4A34F]/40 hover:bg-[#1A3A2E]"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {isUser && (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EEF2E4] text-[#205C46] shadow-md">
          <UserRound className="h-6 w-6" />
        </div>
      )}
    </div>
  );
}