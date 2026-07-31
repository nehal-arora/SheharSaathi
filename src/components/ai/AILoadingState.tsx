import { Loader2, Sparkles } from "lucide-react";

interface AILoadingStateProps {
  title?: string;
  description?: string;
}

export default function AILoadingState({
  title = "Generating AI insights",
  description = "Please wait while शहरSaathi AI analyses your request and prepares personalized recommendations.",
}: AILoadingStateProps) {
  return (
    <section className="relative overflow-hidden rounded-[30px] border border-[#205C46]/40 bg-[#0D211B] px-6 py-14 text-center shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
      {/* Background Glow */}

      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#D4A34F]/10 blur-3xl" />

      <div className="absolute -left-10 bottom-0 h-44 w-44 rounded-full bg-[#205C46]/20 blur-3xl" />

      <div className="relative flex flex-col items-center">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-[26px] border border-[#D4A34F]/25 bg-[#D4A34F]/10">
          <Sparkles className="h-10 w-10 text-[#F0C86A]" />

          <Loader2 className="absolute -right-3 -top-3 h-8 w-8 animate-spin rounded-full bg-[#123126] p-1.5 text-[#F0C86A] shadow-lg" />
        </div>

        <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-[#D4A34F]">
          AI Assistant Working
        </p>

        <h2 className="mt-3 text-3xl font-bold text-[#FBFAF7]">
          {title}
        </h2>

        <p className="mt-4 max-w-lg text-sm leading-7 text-[#B8C5BF] sm:text-base">
          {description}
        </p>

        {/* Animated Dots */}

        <div className="mt-8 flex items-center gap-3">
          <span className="h-3 w-3 animate-bounce rounded-full bg-[#D4A34F] [animation-delay:-0.3s]" />

          <span className="h-3 w-3 animate-bounce rounded-full bg-[#D4A34F] [animation-delay:-0.15s]" />

          <span className="h-3 w-3 animate-bounce rounded-full bg-[#D4A34F]" />
        </div>

        <p className="mt-6 text-sm font-medium text-[#9EAEA7]">
          Analysing • Reasoning • Generating Response
        </p>
      </div>
    </section>
  );
}