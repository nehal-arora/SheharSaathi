"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Menu, Sparkles, UserRound, Users, X } from "lucide-react";

import Logo from "@/components/common/Logo";

const roommateLinks = [
  {
    label: "Browse",
    href: "/roommates",
    icon: Users,
  },
  {
    label: "AI Matches",
    href: "/roommates/recommendations",
    icon: Sparkles,
  },
  {
    label: "Favorites",
    href: "/roommates/favorites",
    icon: Heart,
  },
  {
    label: "My Profile",
    href: "/roommates/profile",
    icon: UserRound,
  },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#E6E2D6] bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />

        {/* Desktop navigation */}

        <nav className="hidden items-center gap-6 lg:flex">
          <Link
            href="/"
            className="font-medium text-[#333333] transition-colors hover:text-[#6B8E23]"
          >
            Home
          </Link>

          <Link
            href="/housing"
            className="font-medium text-[#333333] transition-colors hover:text-[#6B8E23]"
          >
            Housing
          </Link>

          <div className="group relative">
            <button
              type="button"
              className="inline-flex items-center gap-2 font-medium text-[#333333] transition-colors hover:text-[#6B8E23]"
            >
              <Users size={18} />
              Roommates
            </button>

            <div className="invisible absolute left-1/2 top-full w-56 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="rounded-2xl border border-[#E6E2D6] bg-white p-2 shadow-xl">
                {roommateLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#333333] transition hover:bg-[#EEF2E4] hover:text-[#6B8E23]"
                    >
                      <Icon size={18} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <Link
            href="/#features"
            className="font-medium text-[#333333] transition-colors hover:text-[#6B8E23]"
          >
            Features
          </Link>

          <Link
            href="/#about"
            className="font-medium text-[#333333] transition-colors hover:text-[#6B8E23]"
          >
            About
          </Link>

          <Link
            href="/#contact"
            className="font-medium text-[#333333] transition-colors hover:text-[#6B8E23]"
          >
            Contact
          </Link>
        </nav>

        {/* Desktop authentication buttons */}

        <div className="hidden items-center gap-3 lg:flex">
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

        {/* Mobile menu button */}

        <button
          type="button"
          onClick={() =>
            setMobileMenuOpen((previous) => !previous)
          }
          className="rounded-lg p-2 transition hover:bg-[#EEF2E4] lg:hidden"
          aria-label={
            mobileMenuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-[#333333]" />
          ) : (
            <Menu className="h-6 w-6 text-[#333333]" />
          )}
        </button>
      </div>

      {/* Mobile navigation */}

      {mobileMenuOpen && (
        <div className="border-t border-[#E6E2D6] bg-white lg:hidden">
          <nav className="mx-auto max-w-7xl space-y-2 px-4 py-5 sm:px-6">
            <MobileLink
              href="/"
              label="Home"
              onClick={closeMobileMenu}
            />

            <MobileLink
              href="/housing"
              label="Housing"
              onClick={closeMobileMenu}
            />

            <div className="rounded-2xl bg-[#FBFAF5] p-3">
              <p className="mb-2 px-2 text-xs font-bold uppercase tracking-wider text-[#6B8E23]">
                Roommates
              </p>

              <div className="space-y-1">
                {roommateLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[#333333] transition hover:bg-[#EEF2E4] hover:text-[#6B8E23]"
                    >
                      <Icon size={18} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <MobileLink
              href="/#features"
              label="Features"
              onClick={closeMobileMenu}
            />

            <MobileLink
              href="/#about"
              label="About"
              onClick={closeMobileMenu}
            />

            <MobileLink
              href="/#contact"
              label="Contact"
              onClick={closeMobileMenu}
            />

            <div className="grid grid-cols-2 gap-3 pt-3">
              <Link
                href="/login"
                onClick={closeMobileMenu}
                className="rounded-xl border border-[#6B8E23] px-5 py-3 text-center font-medium text-[#6B8E23] transition hover:bg-[#EEF2E4]"
              >
                Login
              </Link>

              <Link
                href="/signup"
                onClick={closeMobileMenu}
                className="rounded-xl bg-[#6B8E23] px-5 py-3 text-center font-medium text-white transition hover:bg-[#556B1F]"
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

interface MobileLinkProps {
  href: string;
  label: string;
  onClick: () => void;
}

function MobileLink({
  href,
  label,
  onClick,
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block rounded-xl px-4 py-3 font-medium text-[#333333] transition hover:bg-[#EEF2E4] hover:text-[#6B8E23]"
    >
      {label}
    </Link>
  );
}