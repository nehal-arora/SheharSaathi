import { Bot, Sparkles } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-4">
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A] shadow-md">
        <Bot className="h-6 w-6" />

        <Sparkles className="absolute -right-1.5 -top-1.5 h-5 w-5 rounded-full bg-[#10271F] p-1 text-[#F0C86A]" />
      </div>

      <div className="rounded-[22px] rounded-bl-lg border border-[#205C46]/40 bg-[#0D211B] px-5 py-4 shadow-[0_14px_35px_rgba(0,0,0,0.22)]">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#D4A34F] [animation-delay:-0.3s]" />

          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#D4A34F] [animation-delay:-0.15s]" />

          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#D4A34F]" />
        </div>

        <p className="mt-3 text-xs font-medium text-[#9EAEA7]">
          शहरSaathi AI is thinking...
        </p>

        <span className="sr-only">
          AI assistant is typing
        </span>
      </div>
    </div>
  );
}