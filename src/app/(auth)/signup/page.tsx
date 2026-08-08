"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  UserPlus,
} from "lucide-react";
import { toast } from "sonner";

import AuthLayout from "@/components/auth/AuthLayout";
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthInput from "@/components/auth/AuthInput";
import PasswordInput from "@/components/auth/PasswordInput";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";

import {
  googleLogin,
  signupUser,
} from "@/lib/api";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [
    googleLoading,
    setGoogleLoading,
  ] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error(
        "Passwords do not match."
      );

      return;
    }

    try {
      setLoading(true);

      await signupUser({
        name,
        email,
        password,
      });

      toast.success(
        "Account created successfully!"
      );

      router.push("/login");
    } catch (error: any) {
      const message =
        error?.response?.data?.detail ||
        error?.message ||
        "Signup failed. Please try again.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSuccess(
    credential: string
  ) {
    try {
      setGoogleLoading(true);

      await googleLogin(credential);

      toast.success(
        "Account created with Google!"
      );

      router.replace("/dashboard");
      router.refresh();
    } catch (error: any) {
      const message =
        error?.response?.data?.detail ||
        error?.message ||
        "Google sign-up failed.";

      toast.error(message);
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <AuthLayout>
      <AuthCard>
        <div className="relative overflow-hidden rounded-[30px] border border-[#205C46]/40 bg-[#0D211B] p-6 shadow-[0_22px_70px_rgba(0,0,0,0.28)] sm:p-8">
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#D4A34F]/10 blur-3xl" />

          <div className="absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-[#205C46]/20 blur-3xl" />

          <div className="relative">
            <div className="mb-7 flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A34F]/20 bg-[#D4A34F]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#F0C86A]">
                  <Sparkles className="h-4 w-4" />
                  Join शहरSaathi
                </div>

                <div className="mt-5">
                  <AuthHeader
                    title="Create Account"
                    subtitle="Start your smart relocation journey with personalized housing, roommate, expense and AI tools."
                  />
                </div>
              </div>

              <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-[20px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A] sm:flex">
                <UserPlus className="h-7 w-7" />
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <AuthInput
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(event) =>
                  setName(
                    event.target.value
                  )
                }
                required
              />

              <AuthInput
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value
                  )
                }
                required
              />

              <PasswordInput
                label="Password"
                placeholder="Create a password"
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value
                  )
                }
              />

              <PasswordInput
                label="Confirm Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(
                    event.target.value
                  )
                }
              />

              <button
                type="submit"
                disabled={
                  loading ||
                  googleLoading
                }
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#D4A34F] px-5 text-base font-bold text-[#071512] shadow-[0_12px_30px_rgba(212,163,79,0.24)] transition hover:-translate-y-0.5 hover:bg-[#F0C86A] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#071512] border-t-transparent" />

                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account

                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#205C46]/40" />

              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#7F9189]">
                Or continue with
              </span>

              <div className="h-px flex-1 bg-[#205C46]/40" />
            </div>

            <div className="flex min-h-12 w-full items-center justify-center rounded-2xl border border-[#205C46]/45 bg-[#10271F] px-4 py-2">
              {googleLoading ? (
                <div className="flex items-center gap-3 text-sm font-semibold text-[#D6E0DB]">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#D4A34F] border-t-transparent" />

                  Creating account with Google...
                </div>
              ) : (
                <GoogleSignInButton
                  onSuccess={
                    handleGoogleSuccess
                  }
                  onError={() =>
                    toast.error(
                      "Google sign-up failed."
                    )
                  }
                />
              )}
            </div>

            <div className="mt-7 rounded-[20px] border border-[#205C46]/35 bg-[#10271F] p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
                  <ShieldCheck className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-sm font-bold text-[#FBFAF7]">
                    Secure account creation
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#9EAEA7]">
                    Your account details are used to personalize and protect your शहरSaathi experience.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-7 text-center text-sm text-[#9EAEA7]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-[#F0C86A] transition hover:text-[#FFD98A]"
              >
                Login
              </Link>
            </p>

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#6F8179]">
              <LockKeyhole className="h-3.5 w-3.5 text-[#D4A34F]" />

              Protected account registration
            </div>
          </div>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}