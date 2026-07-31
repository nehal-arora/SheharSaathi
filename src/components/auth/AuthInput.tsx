"use client";

import type { InputHTMLAttributes } from "react";

interface AuthInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function AuthInput({
  label,
  error,
  className = "",
  ...props
}: AuthInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-[#D6E0DB]">
        {label}
      </label>

      <input
        {...props}
        className={`
          h-12
          w-full
          rounded-2xl
          border
          border-[#205C46]/45
          bg-[#10271F]
          px-5
          text-[#FBFAF7]
          placeholder:text-[#7F9189]
          outline-none
          transition-all
          duration-300
          focus:border-[#D4A34F]
          focus:ring-4
          focus:ring-[#D4A34F]/20
          ${className}
        `}
      />

      {error && (
        <p className="text-sm font-medium text-[#FF8A8A]">
          {error}
        </p>
      )}
    </div>
  );
}