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
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_0.8fr_0.8fr_0.9fr]">
          <div className="max-w-sm">
            <Logo />

            <p className="mt-6 text-sm leading-7 text-muted-foreground">
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
                  className="group flex items-center gap-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
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
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title="Get started">
            <Link
              href="/signup"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Create account
            </Link>

            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Login
            </Link>

            <Link
              href="/#about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              About SheharSaathi
            </Link>

            <div className="flex items-start gap-2.5 pt-2 text-sm leading-6 text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Built in Delhi, India
            </div>
          </FooterColumn>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-7 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} SheharSaathi. All rights reserved.
          </p>

          <p className="inline-flex items-center gap-1.5">
            Made with
            <Heart className="h-4 w-4 fill-primary text-primary" />
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
      <h3 className="text-sm font-extrabold uppercase tracking-[0.14em] text-foreground">
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
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
    >
      <Icon className="h-[18px] w-[18px]" />
    </a>
  );
}