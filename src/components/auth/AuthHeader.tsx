"use client";

import Logo from "@/components/common/Logo";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export default function AuthHeader({
  title,
  subtitle,
}: AuthHeaderProps) {
  return (
    <div className="mb-10 text-center">
      {/* Logo */}
      <div className="mb-8 flex justify-center">
        <Logo showTagline={false} />
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-bold tracking-tight text-[#333333] md:text-4xl">
        {title}
      </h1>

      {/* Subtitle */}
      <p className="mt-3 text-sm leading-6 text-gray-500 md:text-base">
        {subtitle}
      </p>
    </div>
  );
}