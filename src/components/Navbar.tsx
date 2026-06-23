"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

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
    <header className="sticky top-0 z-50 border-b border-black/[0.04] bg-white/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-xs font-bold text-white">
            {locale === "fa" ? "ش" : "S"}
          </div>
          <span className="text-base font-bold text-navy">
            {locale === "fa" ? "شاهین میرزایی" : "Shahin Mirzaei"}
          </span>
        </Link>

        <ul className="hidden gap-1 md:flex">
          {navLinks.map(({ href, key }) => (
            <li key={key}>
              <Link
                href={href}
                className={`rounded-lg px-3.5 py-2 text-sm transition-colors ${
                  pathname === href
                    ? "bg-navy/[0.04] font-semibold text-navy"
                    : "text-[#6B7280] hover:bg-navy/[0.03] hover:text-navy"
                }`}
              >
                {t(key)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href={pathname}
            locale={otherLocale}
            className="rounded-lg border border-[#E5E7EB] px-3 py-1.5 text-xs font-semibold text-[#6B7280] transition-colors hover:border-navy/20 hover:text-navy"
          >
            {locale === "fa" ? "EN" : "FA"}
          </Link>
          <Link
            href="/contact"
            className="rounded-lg bg-navy px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-navy/90"
          >
            {locale === "fa" ? "مشاوره" : "Consult"}
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-navy md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-black/[0.04] px-6 pb-5 md:hidden">
          <ul className="flex flex-col gap-1 py-3">
            {navLinks.map(({ href, key }) => (
              <li key={key}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 text-sm ${
                    pathname === href ? "bg-navy/[0.04] font-semibold text-navy" : "text-[#6B7280]"
                  }`}
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3 border-t border-black/[0.04] pt-3">
            <Link href={pathname} locale={otherLocale} className="text-sm font-medium text-[#6B7280]">
              {locale === "fa" ? "English" : "فارسی"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
