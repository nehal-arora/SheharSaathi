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
    <div className="mb-8 text-center">
      {/* Logo */}
      <div className="mb-7 flex justify-center">
        <Logo showTagline={false} />
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-bold tracking-tight text-[#FBFAF7] md:text-4xl">
        {title}
      </h1>

      {/* Subtitle */}
      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#A9BBB4] md:text-base">
        {subtitle}
      </p>
    </div>
  );
}