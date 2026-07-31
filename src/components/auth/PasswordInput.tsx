"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  error?: string;
}

export default function PasswordInput({
  label,
  placeholder,
  value,
  onChange,
  error,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-[#D6E0DB]">
        {label}
      </label>

      <div className="relative">
        <input
          type={
            showPassword
              ? "text"
              : "password"
          }
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="
            h-12
            w-full
            rounded-2xl
            border
            border-[#205C46]/45
            bg-[#10271F]
            px-5
            pr-14
            text-[#FBFAF7]
            placeholder:text-[#7F9189]
            outline-none
            transition-all
            duration-300
            focus:border-[#D4A34F]
            focus:ring-4
            focus:ring-[#D4A34F]/20
          "
        />

        <button
          type="button"
          onClick={() =>
            setShowPassword((prev) => !prev)
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7F9189] transition hover:text-[#F0C86A]"
          aria-label={
            showPassword
              ? "Hide password"
              : "Show password"
          }
        >
          {showPassword ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>
      </div>

      {error && (
        <p className="text-sm font-medium text-[#FF8A8A]">
          {error}
        </p>
      )}
    </div>
  );
}