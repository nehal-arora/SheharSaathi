"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import AuthLayout from "@/components/auth/AuthLayout";
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthInput from "@/components/auth/AuthInput";
import PasswordInput from "@/components/auth/PasswordInput";

import { loginUser } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await loginUser({
        email,
        password,
      });

      // Save JWT Token
      localStorage.setItem(
        "access_token",
        response.access_token
      );

      // Save User Details
      localStorage.setItem(
        "user",
        JSON.stringify(response.user)
      );

      alert("Login Successful!");

      router.push("/");
    } catch (error: any) {
      const message =
        error?.response?.data?.detail ||
        "Invalid email or password.";

      alert(message);
    } finally {
      setLoading(false);
    }
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
            <button
              type="button"
              className="text-sm font-medium text-[#6B8E23] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#6B8E23] py-3.5 text-lg font-semibold text-white transition-all duration-300 hover:bg-[#58751C] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Logging In..." : "Login"}

            {!loading && <ArrowRight size={20} />}
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
          <Image
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            width={20}
            height={20}
          />

          Continue with Google
        </button>

        <div className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-[#6B8E23] hover:underline"
          >
            Create Account
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}