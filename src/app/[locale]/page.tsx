import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getPublishedArticles } from "@/lib/articles";
import { getPublishedNews } from "@/lib/news";
import {
  Map,
  Settings,
  Brain,
  Bot,
  Layers,
  BarChart2,
} from "lucide-react";

const SERVICE_ICONS = {
  digitalStrategy: Map,
  bpm: Settings,
  aiStrategy: Brain,
  aiAutomation: Bot,
  digitalProduct: Layers,
  bi: BarChart2,
} as const;

const SERVICE_KEYS = [
  "digitalStrategy",
  "bpm",
  "aiStrategy",
  "aiAutomation",
  "digitalProduct",
  "bi",
] as const;

export const dynamic = "force-dynamic";

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();
  const latestArticles = getPublishedArticles().slice(0, 3);
  const latestNews = getPublishedNews().slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-navy">
        <div className="pointer-events-none absolute -top-20 end-[-5%] rounded-full" style={{ width: 500, height: 500, background: "#1E6FA8", opacity: 0.08, filter: "blur(80px)" }} />
        <div className="pointer-events-none absolute -bottom-10 start-[-5%] rounded-full" style={{ width: 300, height: 300, background: "#1E6FA8", opacity: 0.05, filter: "blur(80px)" }} />
        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-0">
          <p className="text-sm font-medium uppercase tracking-widest text-steel">{t("hero.tag")}</p>
          <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-snug text-white md:text-5xl md:leading-tight">{t("hero.title")}</h1>
          <p className="mt-6 max-w-xl text-lg text-muted">{t("hero.subtitle")}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact" className="rounded-lg bg-steel px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-steel/80">{t("hero.ctaPrimary")}</Link>
            <Link href="/services" className="rounded-lg border border-white/30 px-8 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/5">{t("hero.ctaSecondary")}</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-navy">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-3">
            {(["experience", "projects", "organizations"] as const).map((key) => (
              <div key={key} className="border-t-2 border-steel px-4 py-10 text-center">
                <p className="text-4xl font-bold text-white md:text-5xl">{t(`stats.${key}_number`)}</p>
                <p className="mt-3 text-sm text-muted">{t(`stats.${key}_label`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold text-navy">{t("services.title")}</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICE_KEYS.map((key) => {
              const Icon = SERVICE_ICONS[key];
              return (
                <div key={key} className="group rounded-xl border border-[#E5E7EB] bg-white p-6 transition-all hover:border-steel">
                  <Icon className="mb-4 h-7 w-7 text-steel" strokeWidth={1.5} />
                  <h3 className="font-semibold text-navy">{t(`services.items.${key}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{t(`services.items.${key}.description`)}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Link href="/services" className="text-sm font-semibold text-steel hover:underline">{t("services.viewAll")} &rarr;</Link>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      {latestArticles.length > 0 && (
        <section className="bg-offwhite py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-2xl font-bold text-navy">
              {locale === "fa" ? "آخرین مقالات" : "Latest Articles"}
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {latestArticles.map((a) => (
                <Link key={a.slug} href={`/articles/${a.slug}`} className="group overflow-hidden rounded-xl border border-[#E5E7EB] bg-white transition-colors hover:border-steel">
                  {a.coverImage && (
                    <div className="aspect-video overflow-hidden">
                      <img src={a.coverImage} alt="" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-steel/10 px-2.5 py-0.5 text-xs font-medium text-steel">{a.category}</span>
                      <span className="text-xs text-[#6B7280]">{a.publishedAt}</span>
                    </div>
                    <h3 className="mt-3 font-semibold text-navy group-hover:text-steel">
                      {locale === "fa" ? a.titleFa : a.titleEn}
                    </h3>
                    <p className="mt-2 line-clamp-1 text-sm text-[#6B7280]">
                      {locale === "fa" ? a.summaryFa : a.summaryEn}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/articles" className="text-sm font-semibold text-steel hover:underline">
                {locale === "fa" ? "مشاهده همه مقالات ←" : "View all articles →"}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Latest News */}
      {latestNews.length > 0 && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-2xl font-bold text-navy">
              {locale === "fa" ? "آخرین اخبار" : "Latest News"}
            </h2>
            <div className="mt-10 grid gap-5 grid-cols-2 lg:grid-cols-4">
              {latestNews.map((n) => (
                <Link key={n.slug} href={`/news/${n.slug}`} className="group overflow-hidden rounded-xl border border-[#E5E7EB] bg-white transition-colors hover:border-steel">
                  {n.coverImage && (
                    <div className="aspect-video overflow-hidden">
                      <img src={n.coverImage} alt="" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-navy group-hover:text-steel">{n.titleFa}</h3>
                    <p className="mt-1 text-xs text-[#6B7280]">{n.publishedAt}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/news" className="text-sm font-semibold text-steel hover:underline">
                {locale === "fa" ? "مشاهده همه اخبار ←" : "View all news →"}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative overflow-hidden bg-navy">
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 rounded-full" style={{ width: 400, height: 400, background: "#1E6FA8", opacity: 0.08, filter: "blur(80px)" }} />
        <div className="relative mx-auto max-w-6xl px-6 py-24 text-center">
          <h2 className="text-3xl font-bold text-white">{t("home.cta.title")}</h2>
          <p className="mt-4 text-muted">{t("home.cta.subtitle")}</p>
          <Link href="/contact" className="mt-8 inline-block rounded-lg bg-steel px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-steel/80">{t("home.cta.button")}</Link>
        </div>
      </section>
    </>
  );
}
