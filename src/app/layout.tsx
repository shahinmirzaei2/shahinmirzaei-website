import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const vazirmatn = Vazirmatn({ subsets: ["arabic"], variable: "--font-vazirmatn" });

export const metadata: Metadata = {
  title: "Shahin Mirzaei — Digital Transformation Architect",
  description:
    "25 years of experience from code to CEO. Digital transformation strategy, AI, and process optimization.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={`${inter.variable} ${vazirmatn.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full bg-offwhite text-navy" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
