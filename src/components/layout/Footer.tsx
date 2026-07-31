import Link from "next/link";
import {
  Bot,
  Building2,
  Heart,
  Mail,
  MapPin,
  Users,
  WalletCards,
} from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

import Logo from "@/components/common/Logo";

const productLinks = [
  {
    label: "Housing",
    href: "/housing",
    icon: Building2,
  },
  {
    label: "Roommates",
    href: "/roommates",
    icon: Users,
  },
  {
    label: "Expenses",
    href: "/expenses",
    icon: WalletCards,
  },
  {
    label: "AI Assistant",
    href: "/ai",
    icon: Bot,
  },
];

const relocationLinks = [
  {
    label: "Locality Explorer",
    href: "/locality",
  },
  {
    label: "Transport",
    href: "/transport",
  },
  {
    label: "Budget Advisor",
    href: "/budget-advisor",
  },
  {
    label: "Scam Checker",
    href: "/scam-check",
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#D4A34F]/15 bg-[#071512]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#205C46]/15 blur-[100px]" />
        <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-[#D4A34F]/8 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_0.8fr_0.8fr_0.9fr]">
          <div className="max-w-sm">
            <Logo />

            <p className="mt-6 text-sm leading-7 text-[#9EAEA7]">
              An AI-powered relocation platform helping students and
              professionals find housing, roommates, locality insights, and
              everyday support in a new city.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <SocialLink
                href="https://github.com/nehal-arora"
                label="GitHub"
                icon={FaGithub}
              />

              <SocialLink
                href="https://www.linkedin.com"
                label="LinkedIn"
                icon={FaLinkedinIn}
              />

              <SocialLink
                href="mailto:hello@sheharsaathi.com"
                label="Email"
                icon={Mail}
              />
            </div>
          </div>

          <FooterColumn title="Product">
            {productLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-2.5 text-sm font-medium text-[#9EAEA7] transition-all duration-200 hover:translate-x-1 hover:text-[#F0C86A]"
                >
                  <Icon className="h-4 w-4 text-[#8AB59C] transition-all duration-200 group-hover:scale-110 group-hover:text-[#D4A34F]" />
                  {item.label}
                </Link>
              );
            })}
          </FooterColumn>

          <FooterColumn title="Relocation tools">
            {relocationLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[#9EAEA7] transition-all duration-200 hover:translate-x-1 hover:text-[#F0C86A]"
              >
                {item.label}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title="Get started">
            <Link
              href="/signup"
              className="text-sm font-medium text-[#9EAEA7] transition-all duration-200 hover:translate-x-1 hover:text-[#F0C86A]"
            >
              Create account
            </Link>

            <Link
              href="/login"
              className="text-sm font-medium text-[#9EAEA7] transition-all duration-200 hover:translate-x-1 hover:text-[#F0C86A]"
            >
              Login
            </Link>

            <Link
              href="/#about"
              className="text-sm font-medium text-[#9EAEA7] transition-all duration-200 hover:translate-x-1 hover:text-[#F0C86A]"
            >
              About SheharSaathi
            </Link>

            <div className="flex items-start gap-2.5 pt-2 text-sm leading-6 text-[#9EAEA7]">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D4A34F]" />
              Built in Delhi, India
            </div>
          </FooterColumn>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[#D4A34F]/15 pt-7 text-sm text-[#9EAEA7] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} SheharSaathi. All rights reserved.
          </p>

          <p className="inline-flex items-center gap-1.5">
            Made with
            <Heart className="h-4 w-4 fill-[#D4A34F] text-[#D4A34F]" />
            for people starting somewhere new.
          </p>
        </div>
      </div>
    </footer>
  );
}

interface FooterColumnProps {
  title: string;
  children: React.ReactNode;
}

function FooterColumn({
  title,
  children,
}: FooterColumnProps) {
  return (
    <div>
      <h3 className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#FBFAF7]">
        {title}
      </h3>

      <div className="mt-5 flex flex-col items-start gap-4">
        {children}
      </div>
    </div>
  );
}

interface SocialLinkProps {
  href: string;
  label: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
}

function SocialLink({
  href,
  label,
  icon: Icon,
}: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4A34F]/20 bg-[#0D211B] text-[#9EAEA7] shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-1 hover:border-[#D4A34F]/40 hover:bg-[#D4A34F]/10 hover:text-[#F0C86A]"
    >
      <Icon className="h-[18px] w-[18px]" />
    </a>
  );
}