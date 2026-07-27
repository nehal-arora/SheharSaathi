import { Bot, Check, Copy, UserRound } from "lucide-react";
import { useState } from "react";

import type { AIChatMessage } from "@/features/ai/types";

interface ChatBubbleProps {
  message: AIChatMessage;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const [copied, setCopied] = useState(false);

  const isUser = message.role === "user";

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Unable to copy AI response:", error);
    }
  }

  return (
    <div
      className={`flex w-full gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser ? (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF2E4] text-[#6B8E23]">
          <Bot className="h-5 w-5" />
        </div>
      ) : null}

      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 sm:max-w-[75%] ${
          isUser
            ? "rounded-br-md bg-[#6B8E23] text-white"
            : "rounded-bl-md border border-gray-200 bg-white text-gray-800 shadow-sm"
        }`}
      >
        <p className="whitespace-pre-wrap text-sm leading-6">
          {message.content}
        </p>

        <div
          className={`mt-2 flex items-center gap-3 text-xs ${
            isUser ? "text-white/75" : "text-gray-400"
          }`}
        >
          <span>
            {new Date(message.created_at).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>

          {!isUser ? (
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 transition hover:text-[#6B8E23]"
              aria-label="Copy AI response"
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
          ) : null}
        </div>
      </div>

      {isUser ? (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700">
          <UserRound className="h-5 w-5" />
        </div>
      ) : null}
    </div>
  );
}