import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";

interface AIHeaderProps {
  title: string;
  description: string;
  badge?: string;
  icon?: ReactNode;
}

export default function AIHeader({
  title,
  description,
  badge,
  icon,
}: AIHeaderProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-[#D6C7A1]/60 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          {badge ? (
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF2E4] px-3 py-1.5 text-sm font-semibold text-[#6B8E23]">
              <Sparkles className="h-4 w-4" />
              {badge}
            </div>
          ) : null}

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h1>

          <p className="mt-4 text-base leading-7 text-gray-600">
            {description}
          </p>
        </div>

        {icon ? (
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-[#EEF2E4] text-[#6B8E23]">
            {icon}
          </div>
        ) : null}
      </div>
    </section>
  );
}