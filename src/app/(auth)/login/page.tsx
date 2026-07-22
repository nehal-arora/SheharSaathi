"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import AuthLayout from "@/components/auth/AuthLayout";
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthInput from "@/components/auth/AuthInput";
import PasswordInput from "@/components/auth/PasswordInput";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // TODO:
    // Connect FastAPI Login API

    console.log({
      email,
      password,
    });
  }

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Welcome Back 👋"
          subtitle="Login to continue your smart relocation journey."
        />

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <AuthInput
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex justify-end">
            <Link
              href="/auth/forgot-password"
              className="text-sm font-medium text-[#6B8E23] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#6B8E23] py-3.5 text-lg font-semibold text-white transition-all duration-300 hover:bg-[#58751C]"
          >
            Login
            <ArrowRight size={20} />
          </button>
        </form>

        <div className="my-8 flex items-center">
          <div className="h-px flex-1 bg-[#D6C7A1]" />

          <span className="px-4 text-sm text-gray-500">
            OR
          </span>

          <div className="h-px flex-1 bg-[#D6C7A1]" />
        </div>

        <button
  type="button"
  className="flex w-full items-center justify-center gap-3 rounded-2xl border border-[#D6C7A1] bg-white py-3.5 font-semibold text-[#333333] transition-all duration-300 hover:bg-[#FBFAF5]"
>
  <img
    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
    alt="Google"
    className="h-5 w-5"
  />

  Continue with Google
</button>

        <div className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-semibold text-[#6B8E23] hover:underline"
          >
            Create Account
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}