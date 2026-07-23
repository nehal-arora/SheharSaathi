"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, House, Users } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function WelcomeCard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const firstName = user?.name?.split(" ")[0] || "Friend";

  return (
    <section className="overflow-hidden rounded-3xl border border-[#E8DFC8] bg-white shadow-sm">
      <div className="flex flex-col justify-between gap-8 p-8 lg:flex-row lg:items-center">

        {/* Left Content */}
        <div className="max-w-2xl">

          <p className="text-sm font-medium text-[#6B8E23]">
            {today}
          </p>

          <h1 className="mt-3 text-4xl font-bold text-[#333333]">
            Welcome back,
            <span className="text-[#6B8E23]"> {firstName} 👋</span>
          </h1>

          <p className="mt-4 text-lg leading-8 text-gray-600">
            Continue your relocation journey with verified housing,
            trusted roommates, smart budgeting and AI-powered guidance—
            all in one place.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <Link
              href="/housing"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#6B8E23] px-6 py-3 font-semibold text-white transition hover:bg-[#58751C]"
            >
              Explore Housing
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/roommates"
              className="inline-flex items-center gap-2 rounded-2xl border border-[#D6C7A1] bg-[#FBFAF5] px-6 py-3 font-semibold text-[#333333] transition hover:bg-[#F5F1E7]"
            >
              Find Roommates
            </Link>

          </div>

        </div>

        {/* Right Illustration */}
        <div className="flex justify-center gap-6">

          <div className="rounded-3xl bg-[#FBFAF5] p-6 shadow-sm">
            <House
              size={60}
              className="text-[#6B8E23]"
            />
          </div>

          <div className="rounded-3xl bg-[#FBFAF5] p-6 shadow-sm">
            <Users
              size={60}
              className="text-[#6B8E23]"
            />
          </div>

        </div>

      </div>
    </section>
  );
}