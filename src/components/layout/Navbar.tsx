"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Heart,
  Home,
  House,
  LogIn,
  Menu,
  Sparkles,
  UserPlus,
  UserRound,
  Users,
  X,
} from "lucide-react";

import Logo from "@/components/common/Logo";

const primaryLinks = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Housing",
    href: "/housing",
    icon: House,
  },
];

const roommateLinks = [
  {
    label: "Browse Roommates",
    description: "Explore available roommate profiles",
    href: "/roommates",
    icon: Users,
  },
  {
    label: "AI Matches",
    description: "Discover compatible recommendations",
    href: "/roommates/recommendations",
    icon: Sparkles,
  },
  {
    label: "Favorites",
    description: "View your saved roommate profiles",
    href: "/roommates/favorites",
    icon: Heart,
  },
  {
    label: "My Profile",
    description: "Manage your roommate preferences",
    href: "/roommates/profile",
    icon: UserRound,
  },
];

const sectionLinks = [
  {
    label: "Features",
    href: "/#features",
  },
  {
    label: "About",
    href: "/#about",
  },
  {
    label: "Contact",
    href: "/#contact",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const roommateSectionActive =
    pathname === "/roommates" ||
    pathname.startsWith("/roommates/");

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop navigation */}

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {primaryLinks.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition-all duration-200 ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon
                  aria-hidden="true"
                  className="h-[17px] w-[17px]"
                  strokeWidth={2}
                />

                {item.label}
              </Link>
            );
          })}

          <div className="group relative">
            <button
              type="button"
              aria-haspopup="menu"
              className={`inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition-all duration-200 ${
                roommateSectionActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Users
                aria-hidden="true"
                className="h-[17px] w-[17px]"
                strokeWidth={2}
              />

              Roommates

              <ChevronDown
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
              />
            </button>

            <div className="invisible absolute left-1/2 top-full w-[310px] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <div
                role="menu"
                className="rounded-3xl border border-border bg-popover p-2 shadow-[0_24px_70px_rgba(31,41,55,0.14)]"
              >
                <div className="px-3 pb-2 pt-2">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                    Find your ideal roommate
                  </p>
                </div>

                {roommateLinks.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      className={`group/item flex items-start gap-3 rounded-2xl px-3 py-3 transition-colors ${
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <div
                        className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                          active
                            ? "bg-primary text-primary-foreground"
                            : "bg-primary/10 text-primary group-hover/item:bg-primary group-hover/item:text-primary-foreground"
                        }`}
                      >
                        <Icon
                          aria-hidden="true"
                          className="h-[18px] w-[18px]"
                        />
                      </div>

                      <div>
                        <p className="text-sm font-semibold">
                          {item.label}
                        </p>

                        <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {sectionLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex h-10 items-center rounded-xl px-4 text-sm font-semibold text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop authentication buttons */}

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/login"
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-background px-4 text-sm font-semibold text-foreground transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
          >
            <LogIn
              aria-hidden="true"
              className="h-4 w-4"
            />

            Login
          </Link>

          <Link
            href="/signup"
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[0_8px_24px_rgba(107,142,35,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_12px_30px_rgba(107,142,35,0.28)]"
          >
            <UserPlus
              aria-hidden="true"
              className="h-4 w-4"
            />

            Sign Up
          </Link>
        </div>

        {/* Mobile menu button */}

        <button
          type="button"
          onClick={() =>
            setMobileMenuOpen((previous) => !previous)
          }
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-muted lg:hidden"
          aria-label={
            mobileMenuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile navigation */}

      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-border bg-background lg:hidden"
        >
          <nav
            aria-label="Mobile navigation"
            className="mx-auto max-w-[1440px] space-y-2 px-4 py-5 sm:px-6"
          >
            {primaryLinks.map((item) => {
              const Icon = item.icon;

              return (
                <MobileLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  icon={Icon}
                  active={isActive(item.href)}
                  onClick={closeMobileMenu}
                />
              );
            })}

            <div className="rounded-3xl border border-border bg-muted/60 p-2">
              <div className="px-3 pb-2 pt-2">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                  Roommates
                </p>
              </div>

              <div className="space-y-1">
                {roommateLinks.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition-colors ${
                        active
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-background"
                      }`}
                    >
                      <Icon
                        aria-hidden="true"
                        className="h-[18px] w-[18px]"
                      />

                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {sectionLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className="flex items-center rounded-2xl px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}

            <div className="grid grid-cols-2 gap-3 border-t border-border pt-4">
              <Link
                href="/login"
                onClick={closeMobileMenu}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-primary/40 bg-background px-4 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
              >
                <LogIn
                  aria-hidden="true"
                  className="h-4 w-4"
                />

                Login
              </Link>

              <Link
                href="/signup"
                onClick={closeMobileMenu}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-[0_8px_24px_rgba(107,142,35,0.2)] transition-colors hover:bg-primary/90"
              >
                <UserPlus
                  aria-hidden="true"
                  className="h-4 w-4"
                />

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
  icon: React.ComponentType<{
    className?: string;
  }>;
  active: boolean;
  onClick: () => void;
}

function MobileLink({
  href,
  label,
  icon: Icon,
  active,
  onClick,
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
        active
          ? "bg-primary text-primary-foreground"
          : "text-foreground hover:bg-muted"
      }`}
    >
      <Icon
        aria-hidden="true"
        className="h-[18px] w-[18px]"
      />

      {label}
    </Link>
  );
}