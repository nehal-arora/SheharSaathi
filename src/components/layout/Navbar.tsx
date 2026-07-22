"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import Logo from "@/components/common/Logo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E6E2D6] bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="font-medium text-[#333333] hover:text-[#6B8E23] transition-colors"
          >
            Home
          </Link>

          <Link
            href="#features"
            className="font-medium text-[#333333] hover:text-[#6B8E23] transition-colors"
          >
            Features
          </Link>

          <Link
            href="#about"
            className="font-medium text-[#333333] hover:text-[#6B8E23] transition-colors"
          >
            About
          </Link>

          <Link
            href="#contact"
            className="font-medium text-[#333333] hover:text-[#6B8E23] transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Right Buttons */}
        <div className="hidden items-center gap-3 md:flex">

          <Link
            href="/login"
            className="rounded-xl border border-[#6B8E23] px-5 py-2 font-medium text-[#6B8E23] transition hover:bg-[#EEF2E4]"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="rounded-xl bg-[#6B8E23] px-5 py-2 font-medium text-white transition hover:bg-[#556B1F]"
          >
            Sign Up
          </Link>

        </div>

        {/* Mobile Menu */}
        <button
          className="rounded-lg p-2 hover:bg-[#EEF2E4] md:hidden"
          aria-label="Open Menu"
        >
          <Menu className="h-6 w-6 text-[#333333]" />
        </button>

      </div>
    </header>
  );
}