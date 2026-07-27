"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  FileText,
  Plus,
  ReceiptText,
  WalletCards,
} from "lucide-react";

const navigationItems = [
  {
    label: "All Expenses",
    href: "/expenses",
    icon: ReceiptText,
  },
  {
    label: "Add Expense",
    href: "/expenses/add",
    icon: Plus,
  },
  {
    label: "Dashboard",
    href: "/expenses/dashboard",
    icon: BarChart3,
  },
  {
    label: "Budget",
    href: "/expenses/budget",
    icon: WalletCards,
  },
  {
    label: "Reports",
    href: "/expenses/report",
    icon: FileText,
  },
];

export default function ExpenseNavigation() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/expenses") {
      return pathname === "/expenses";
    }

    return pathname.startsWith(href);
  }

  return (
    <nav
      aria-label="Expense navigation"
      className="overflow-x-auto rounded-2xl border border-[#E7E2D5] bg-white p-2 shadow-sm"
    >
      <div className="flex min-w-max items-center gap-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                active
                  ? "bg-[#6B8E23] text-white shadow-sm"
                  : "text-[#555555] hover:bg-[#EEF2E4] hover:text-[#6B8E23]"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}