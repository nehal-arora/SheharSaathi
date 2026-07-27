import type { LucideIcon } from "lucide-react";

interface AnalyticsCardProps {
  title: string;
  value: string;
  description?: string;
  icon: LucideIcon;
}

export default function AnalyticsCard({
  title,
  value,
  description,
  icon: Icon,
}: AnalyticsCardProps) {
  return (
    <article className="rounded-2xl border border-[#E7E2D5] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold text-[#333333]">
            {value}
          </p>

          {description ? (
            <p className="mt-2 text-sm leading-5 text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF2E4] text-[#6B8E23]">
          <Icon size={21} />
        </div>
      </div>
    </article>
  );
}