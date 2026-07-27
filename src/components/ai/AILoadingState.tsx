import { Loader2, Sparkles } from "lucide-react";

interface AILoadingStateProps {
  title?: string;
  description?: string;
}

export default function AILoadingState({
  title = "Generating AI insights",
  description = "Please wait while शहरSaathi analyses your information.",
}: AILoadingStateProps) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-[#FBFAF5] px-6 py-12 text-center">
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EEF2E4] text-[#6B8E23]">
        <Sparkles className="h-7 w-7" />

        <Loader2 className="absolute -right-2 -top-2 h-6 w-6 animate-spin rounded-full bg-white p-1 shadow-sm" />
      </div>

      <h2 className="mt-5 text-xl font-semibold text-gray-900">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
        {description}
      </p>

      <div className="mt-6 flex items-center gap-2">
        <span className="h-2 w-2 animate-bounce rounded-full bg-[#6B8E23] [animation-delay:-0.3s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-[#6B8E23] [animation-delay:-0.15s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-[#6B8E23]" />
      </div>
    </div>
  );
}