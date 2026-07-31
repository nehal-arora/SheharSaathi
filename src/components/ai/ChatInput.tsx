"use client";

import { useState } from "react";
import { SendHorizonal } from "lucide-react";

interface ChatInputProps {
  loading?: boolean;
  onSend: (
    message: string
  ) => Promise<void> | void;
}

export default function ChatInput({
  loading = false,
  onSend,
}: ChatInputProps) {
  const [message, setMessage] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const value = message.trim();

    if (!value || loading) return;

    await onSend(value);

    setMessage("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-[#205C46]/40 bg-[#0D211B] p-4 shadow-2xl"
    >
      <div className="flex items-end gap-4">
        <textarea
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          rows={2}
          placeholder="Ask about housing, roommates, relocation, safety, budgeting..."
          className="min-h-[56px] flex-1 resize-none rounded-2xl border border-[#205C46]/40 bg-[#123126] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-[#8FA29B] focus:border-[#D4A34F] focus:ring-2 focus:ring-[#D4A34F]/20"
        />

        <button
          type="submit"
          disabled={
            loading ||
            message.trim().length === 0
          }
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D4A34F] to-[#C68A2B] text-[#071512] shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#071512] border-t-transparent" />
          ) : (
            <SendHorizonal className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-[#8FA29B]">
        <span>
          AI may make mistakes. Verify
          important information.
        </span>

        <span>
          {message.length}/1000
        </span>
      </div>
    </form>
  );
}