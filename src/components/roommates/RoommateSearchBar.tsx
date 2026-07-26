"use client";

import { Search, X } from "lucide-react";

interface RoommateSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RoommateSearchBar({
  value,
  onChange,
  placeholder = "Search by name, city, locality, occupation...",
}: RoommateSearchBarProps) {
  return (
    <div className="relative w-full">
      <Search
        size={20}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        aria-hidden="true"
      />

      <input
        type="search"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="w-full rounded-2xl border border-gray-200 bg-white py-3.5 pl-12 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#6B8E23] focus:ring-4 focus:ring-[#EEF2E4]"
        aria-label="Search roommate profiles"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}