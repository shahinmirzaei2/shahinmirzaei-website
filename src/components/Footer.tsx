import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Mail, Phone, MapPin } from "lucide-react";

const NAV_LINKS = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/about", key: "about" },
  { href: "/articles", key: "articles" },
  { href: "/news", key: "news" },
  { href: "/contact", key: "contact" },
] as const;

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <footer className="bg-navy">
      <div className="mx-auto max-w-6xl px-6">
        {/* Main footer */}
        <div className="grid gap-10 py-16 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-steel text-xs font-bold text-white">
                {locale === "fa" ? "ش" : "S"}
              </div>
              <span className="text-base font-bold text-white">{t("footer.name")}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/30">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Nav links */}
          <div className="md:col-span-3">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/20">
              {locale === "fa" ? "صفحات" : "Pages"}
            </p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map(({ href, key }) => (
                <li key={key}>
                  <Link href={href} className="text-sm text-white/40 transition-colors hover:text-white">
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="md:col-span-5">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/20">
              {locale === "fa" ? "ارتباط" : "Contact"}
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-steel/60" />
                <span className="text-sm text-white/40" dir="ltr">shahinmirzaei@aut.ac.ir</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-steel/60" />
                <span className="text-sm text-white/40" dir="ltr">09123135494</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-steel/60" />
                <span className="text-sm text-white/40">{t("contact.info.locationValue")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] py-6 text-center text-xs text-white/20">
          &copy; {new Date().getFullYear()} {t("footer.name")}. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
