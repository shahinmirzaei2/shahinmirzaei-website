import { useTranslations } from "next-intl";
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

  return (
    <footer className="bg-navy">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Logo + tagline */}
          <div>
            <p className="text-lg font-bold text-white">{t("footer.name")}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Nav links */}
          <div>
            <ul className="space-y-2.5">
              {NAV_LINKS.map(({ href, key }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-sm text-muted transition-colors hover:text-white"
                  >
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-steel" />
              <span className="text-sm text-muted" dir="ltr">shahinmirzaei@aut.ac.ir</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-steel" />
              <span className="text-sm text-muted" dir="ltr">09123135494</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 text-steel" />
              <span className="text-sm text-muted">{t("contact.info.locationValue")}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-muted/60">
          &copy; {new Date().getFullYear()} {t("footer.name")}. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
