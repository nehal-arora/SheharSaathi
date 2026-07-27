"use client";

import { useState } from "react";
import { SendHorizonal } from "lucide-react";

interface ChatInputProps {
  loading?: boolean;
  onSend: (message: string) => Promise<void> | void;
}

export default function ChatInput({
  loading = false,
  onSend,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

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
      className="flex items-end gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm"
    >
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={2}
        placeholder="Ask anything about relocation, housing, budgeting or safety..."
        className="min-h-[52px] flex-1 resize-none border-0 bg-transparent text-sm outline-none placeholder:text-gray-400"
      />

      <button
        type="submit"
        disabled={loading || message.trim().length === 0}
        className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6B8E23] text-white transition hover:bg-[#5b7a1d] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <SendHorizonal className="h-5 w-5" />
      </button>
    </form>
  );
}