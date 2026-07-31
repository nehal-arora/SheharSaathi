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
    <div className="group relative w-full">
      <Search
        size={20}
        aria-hidden="true"
        className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#9EAEA7] transition-colors duration-200 group-focus-within:text-[#F0C86A]"
      />

      <input
        type="search"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        aria-label="Search roommate profiles"
        className="w-full rounded-[22px] border border-[#205C46]/40 bg-[#0D211B] py-4 pl-14 pr-14 text-sm text-[#FBFAF7] shadow-[0_10px_30px_rgba(0,0,0,0.15)] outline-none transition-all duration-200 placeholder:text-[#7B8D86] hover:border-[#205C46]/70 focus:border-[#D4A34F] focus:ring-4 focus:ring-[#D4A34F]/10"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-[#9EAEA7] transition-all duration-200 hover:bg-[#205C46]/20 hover:text-[#F0C86A]"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}