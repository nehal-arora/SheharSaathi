import type { ReactNode } from "react";

interface AIResultCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
}

export default function AIResultCard({
  title,
  description,
  icon,
  children,
}: AIResultCardProps) {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        {icon ? (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF2E4] text-[#6B8E23]">
            {icon}
          </div>
        ) : null}

        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-semibold text-gray-900">
            {title}
          </h2>

          {description ? (
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {description}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-6">
        {children}
      </div>
    </section>
  );
}