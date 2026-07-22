import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 transition-opacity hover:opacity-90"
    >
      {/* Temporary Logo Icon */}
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#6B8E23] text-xl shadow-sm">
        🏡
      </div>

      {/* Brand Name */}
      <div className="flex flex-col leading-none">
        <span
          className="text-2xl font-extrabold tracking-tight text-[#333333]"
          style={{ fontFamily: "var(--font-hindi)" }}
        >
          शहर<span style={{ fontFamily: "var(--font-manrope)" }}>Saathi</span>
        </span>

        <span className="text-xs text-gray-500">
          Making Every New City Feel Like Home
        </span>
      </div>
    </Link>
  );
}