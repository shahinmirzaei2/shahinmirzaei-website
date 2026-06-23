import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getPublishedArticles } from "@/lib/articles";
import { getPublishedNews } from "@/lib/news";
import {
  Map, Settings, Brain, Bot, Layers, BarChart2,
  ArrowLeft, ArrowRight, CheckCircle2,
} from "lucide-react";

const SERVICE_ICONS = {
  digitalStrategy: Map, bpm: Settings, aiStrategy: Brain,
  aiAutomation: Bot, digitalProduct: Layers, bi: BarChart2,
} as const;

const SERVICE_KEYS = [
  "digitalStrategy", "bpm", "aiStrategy",
  "aiAutomation", "digitalProduct", "bi",
] as const;

export const dynamic = "force-dynamic";

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();
  const Arrow = locale === "fa" ? ArrowLeft : ArrowRight;
  const latestArticles = getPublishedArticles().slice(0, 3);
  const latestNews = getPublishedNews().slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-navy">
        <div className="pointer-events-none absolute -top-40 end-[-10%] h-[600px] w-[600px] rounded-full bg-steel/[0.07] blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-20 start-[-8%] h-[400px] w-[400px] rounded-full bg-steel/[0.04] blur-[100px]" />
        <div className="pointer-events-none absolute end-[10%] top-[15%] h-px w-32 bg-gradient-to-l from-steel/20 to-transparent" />
        <div className="pointer-events-none absolute bottom-[20%] start-[5%] h-px w-24 bg-gradient-to-r from-steel/15 to-transparent" />

        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-steel/20 bg-steel/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-steel" />
            <span className="text-xs font-medium tracking-wide text-steel">{t("hero.tag")}</span>
          </div>

          <h1 className="mt-8 max-w-3xl text-3xl font-extrabold leading-[1.3] text-white md:text-[3.25rem] md:leading-[1.25]">
            {t("hero.title")}
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/50 md:text-lg">
            {t("hero.subtitle")}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/contact" className="group inline-flex items-center gap-2 rounded-lg bg-steel px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-steel/85 hover:shadow-lg hover:shadow-steel/20">
              {t("hero.ctaPrimary")}
              <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </Link>
            <Link href="/services" className="rounded-lg border border-white/15 px-7 py-3.5 text-sm font-medium text-white/70 transition-all hover:border-white/30 hover:text-white">
              {t("hero.ctaSecondary")}
            </Link>
          </div>

          {/* Trust signals */}
          <div className="mt-16 flex flex-wrap items-center gap-6 text-white/30">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-steel/60" />
              <span className="text-xs">{t("stats.experience_number")} {t("stats.experience_label")}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-steel/60" />
              <span className="text-xs">{t("stats.projects_number")} {t("stats.projects_label")}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-steel/60" />
              <span className="text-xs">{t("stats.organizations_number")} {t("stats.organizations_label")}</span>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-offwhite to-transparent" />
      </section>

      {/* Stats */}
      <section className="relative -mt-12 z-10 mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-3 overflow-hidden rounded-2xl bg-white shadow-xl shadow-navy/5">
          {(["experience", "projects", "organizations"] as const).map((key, i) => (
            <div key={key} className={`px-6 py-10 text-center ${i < 2 ? "border-e border-[#E5E7EB]" : ""}`}>
              <p className="text-3xl font-extrabold text-navy md:text-4xl">{t(`stats.${key}_number`)}</p>
              <p className="mt-2 text-sm font-medium text-[#6B7280]">{t(`stats.${key}_label`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-steel">
              {locale === "fa" ? "تخصص‌های من" : "Expertise"}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy">{t("services.title")}</h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICE_KEYS.map((key) => {
              const Icon = SERVICE_ICONS[key];
              return (
                <div key={key} className="group relative rounded-2xl border border-[#E5E7EB] bg-white p-7 transition-all duration-300 hover:border-steel/30 hover:shadow-lg hover:shadow-steel/5">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-steel/10 to-steel/5 text-steel transition-colors group-hover:from-steel/15 group-hover:to-steel/10">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base font-bold text-navy">{t(`services.items.${key}.title`)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">{t(`services.items.${key}.description`)}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-12 text-center">
            <Link href="/services" className="group inline-flex items-center gap-2 text-sm font-semibold text-steel hover:underline">
              {t("services.viewAll")}
              <Arrow className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      {latestArticles.length > 0 && (
        <section className="border-y border-[#E5E7EB] bg-white py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-steel">
                  {locale === "fa" ? "وبلاگ" : "Blog"}
                </span>
                <h2 className="mt-3 text-3xl font-extrabold text-navy">
                  {locale === "fa" ? "آخرین مقالات" : "Latest Articles"}
                </h2>
              </div>
              <Link href="/articles" className="group hidden items-center gap-2 text-sm font-semibold text-steel hover:underline md:inline-flex">
                {locale === "fa" ? "همه مقالات" : "All articles"}
                <Arrow className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {latestArticles.map((a) => (
                <Link key={a.slug} href={`/articles/${a.slug}`} className="group overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-all hover:shadow-lg hover:shadow-navy/5">
                  {a.coverImage ? (
                    <div className="aspect-video overflow-hidden">
                      <img src={a.coverImage} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                  ) : (
                    <div className="flex aspect-video items-center justify-center bg-navy/[0.03]">
                      <span className="text-3xl font-bold text-navy/10">{a.titleFa[0]}</span>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-steel/10 px-2.5 py-0.5 text-xs font-medium text-steel">{a.category}</span>
                      <span className="text-xs text-[#9CA3AF]">{a.publishedAt}</span>
                    </div>
                    <h3 className="mt-3 font-bold text-navy transition-colors group-hover:text-steel">
                      {locale === "fa" ? a.titleFa : a.titleEn}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#6B7280]">
                      {locale === "fa" ? a.summaryFa : a.summaryEn}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest News */}
      {latestNews.length > 0 && (
        <section className="py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-end justify-between">
              <h2 className="text-2xl font-extrabold text-navy">
                {locale === "fa" ? "آخرین اخبار" : "Latest News"}
              </h2>
              <Link href="/news" className="group hidden items-center gap-2 text-sm font-semibold text-steel hover:underline md:inline-flex">
                {locale === "fa" ? "همه اخبار" : "All news"}
                <Arrow className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-10 grid gap-5 grid-cols-2 lg:grid-cols-4">
              {latestNews.map((n) => (
                <Link key={n.slug} href={`/news/${n.slug}`} className="group overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-all hover:shadow-lg hover:shadow-navy/5">
                  {n.coverImage && (
                    <div className="aspect-video overflow-hidden">
                      <img src={n.coverImage} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-navy group-hover:text-steel">{n.titleFa}</h3>
                    <p className="mt-1 text-xs text-[#9CA3AF]">{n.publishedAt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative overflow-hidden bg-navy">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-steel/[0.06] blur-[100px]" />
        <div className="relative mx-auto max-w-6xl px-6 py-28 text-center">
          <h2 className="text-3xl font-extrabold text-white md:text-4xl">{t("home.cta.title")}</h2>
          <p className="mx-auto mt-5 max-w-lg text-base text-white/40">{t("home.cta.subtitle")}</p>
          <Link href="/contact" className="group mt-10 inline-flex items-center gap-2 rounded-lg bg-steel px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-steel/85 hover:shadow-lg hover:shadow-steel/25">
            {t("home.cta.button")}
            <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
          </Link>
        </div>
      </section>
    </>
  );
}
