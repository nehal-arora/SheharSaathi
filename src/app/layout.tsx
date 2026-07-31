import type { Metadata } from "next";
import {
  Manrope,
  Noto_Sans_Devanagari,
} from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const notoSansDevanagari =
  Noto_Sans_Devanagari({
    variable: "--font-hindi",
    subsets: ["devanagari"],
    weight: ["400", "500", "600", "700"],
  });

export const metadata: Metadata = {
  title: "शहरSaathi",
  description:
    "Making Every New City Feel Like Home",
  keywords: [
    "Relocation",
    "Housing",
    "Roommates",
    "AI",
    "Students",
    "Expenses",
    "Transport",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${notoSansDevanagari.variable}`}
    >
      <body className="min-h-screen bg-[#071512] font-sans text-[#FBFAF7] antialiased">
        {children}

        <Toaster
          position="top-right"
          richColors
          closeButton
          duration={3000}
          expand
          visibleToasts={3}
          theme="dark"
          toastOptions={{
            style: {
              background: "#0D211B",
              color: "#FBFAF7",
              border:
                "1px solid rgba(212, 163, 79, 0.2)",
            },
          }}
        />
      </body>
    </html>
  );
}