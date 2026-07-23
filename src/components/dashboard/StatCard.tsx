import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg,
  iconColor,
}: StatCardProps) {
  return (
    <div className="rounded-3xl border border-[#E8DFC8] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      <div
        className="flex h-14 w-14 items-center justify-center rounded-2xl"
        style={{
          backgroundColor: iconBg,
        }}
      >
        <Icon
          size={28}
          style={{
            color: iconColor,
          }}
        />
      </div>


      <div className="mt-6">

        <p className="text-sm font-medium text-gray-500">
          {title}
        </p>


        <h3 className="mt-2 text-3xl font-bold text-[#333333]">
          {value}
        </h3>


        <p className="mt-2 text-sm text-gray-500">
          {subtitle}
        </p>

      </div>

    </div>
  );
}