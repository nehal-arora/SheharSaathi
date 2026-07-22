"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import AuthLayout from "@/components/auth/AuthLayout";
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthInput from "@/components/auth/AuthInput";
import PasswordInput from "@/components/auth/PasswordInput";

import { signupUser } from "@/lib/api";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await signupUser({
        name,
        email,
        password,
      });

      toast.success("Account created successfully!");

      router.push("/login");
    } catch (error: any) {
      const message =
        error?.response?.data?.detail ||
        "Signup failed. Please try again.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Create Account 🌿"
          subtitle="Join शहरSaathi and start your smart relocation journey."
        />

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <AuthInput
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#6B8E23] py-3.5 text-lg font-semibold text-white transition-all duration-300 hover:bg-[#58751C] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Creating Account..." : "Create Account"}

            {!loading && <ArrowRight size={20} />}
          </button>
        </form>

        <div className="my-7 flex items-center">
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

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#6B8E23] hover:underline"
          >
            Login
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  );
}