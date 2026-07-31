"use client";

import { useState } from "react";
import {
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

export default function SearchBar({
  onSearch,
}: SearchBarProps) {
  const [value, setValue] = useState("");

  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();
    onSearch(value.trim());
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        flex
        flex-col
        gap-4
        rounded-3xl
        border
        border-[#D4A34F]/15
        bg-[#0D211B]
        p-4
        shadow-[0_18px_55px_rgba(0,0,0,0.28)]
        sm:flex-row
        sm:items-center
      "
    >
      <div
        className="
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center
          rounded-2xl
          bg-[#205C46]/40
          text-[#F0C86A]
        "
      >
        <Search className="h-5 w-5" />
      </div>

      <div className="flex-1">
        <div className="mb-2 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-[#D4A34F]" />

          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D4A34F]">
            Search Location
          </span>
        </div>

        <input
          value={value}
          onChange={(e) =>
            setValue(e.target.value)
          }
          placeholder="Delhi, Noida, Rohini, Lajpat Nagar..."
          className="
            h-12
            w-full
            rounded-2xl
            border
            border-[#D4A34F]/12
            bg-[#071512]
            px-4
            text-[#FBFAF7]
            placeholder:text-[#66766F]
            outline-none
            transition-all
            focus:border-[#D4A34F]/45
            focus:ring-2
            focus:ring-[#D4A34F]/10
          "
        />
      </div>

      <button
        type="submit"
        className="
          flex
          h-12
          items-center
          justify-center
          gap-2
          rounded-2xl
          bg-[#D4A34F]
          px-7
          font-semibold
          text-[#10251D]
          shadow-[0_12px_30px_rgba(212,163,79,0.22)]
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:bg-[#E5B65B]
          active:translate-y-0
        "
      >
        <Sparkles className="h-4 w-4" />
        Search
      </button>
    </form>
  );
}