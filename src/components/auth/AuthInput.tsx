"use client";

import { InputHTMLAttributes } from "react";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
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
      <label className="block text-sm font-semibold text-[#333333]">
        {label}
      </label>

      <input
        {...props}
        className={`
          w-full
          rounded-2xl
          border
          border-[#D6C7A1]
          bg-white
          px-5
          py-3.5
          text-[#333333]
          placeholder:text-gray-400
          outline-none
          transition-all
          duration-300
          focus:border-[#6B8E23]
          focus:ring-4
          focus:ring-[#EEF2E4]
          ${className}
        `}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}