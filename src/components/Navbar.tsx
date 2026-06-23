"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/about", key: "about" },
  { href: "/articles", key: "articles" },
  { href: "/news", key: "news" },
  { href: "/contact", key: "contact" },
] as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const otherLocale = locale === "fa" ? "en" : "fa";

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5E7EB] bg-offwhite/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold text-navy">
          {locale === "fa" ? "شاهین میرزایی" : "Shahin Mirzaei"}
        </Link>

        <ul className="hidden gap-8 md:flex">
          {navLinks.map(({ href, key }) => (
            <li key={key}>
              <Link
                href={href}
                className={`text-sm transition-colors hover:text-steel ${
                  pathname === href
                    ? "font-semibold text-steel"
                    : "text-slate"
                }`}
              >
                {t(key)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href={pathname}
            locale={otherLocale}
            className="rounded-md border border-navy/10 px-3 py-1 text-xs font-medium text-slate transition-colors hover:border-steel hover:text-steel"
          >
            {locale === "fa" ? "EN" : "FA"}
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-navy md:hidden"
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-[#E5E7EB] px-6 pb-4 md:hidden">
          <ul className="flex flex-col gap-3 py-3">
            {navLinks.map(({ href, key }) => (
              <li key={key}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`block text-sm ${
                    pathname === href ? "font-semibold text-steel" : "text-slate"
                  }`}
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={pathname}
            locale={otherLocale}
            className="text-sm font-medium text-slate hover:text-steel"
          >
            {locale === "fa" ? "English" : "فارسی"}
          </Link>
        </div>
      )}
    </header>
  );
}
