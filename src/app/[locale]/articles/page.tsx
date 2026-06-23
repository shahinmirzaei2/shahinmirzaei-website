import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getPublishedArticles } from "@/lib/articles";

export const dynamic = "force-dynamic";

export default function ArticlesPage() {
  const t = useTranslations("articles");
  const locale = useLocale();
  const articles = getPublishedArticles();

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="text-3xl font-bold text-navy">{t("title")}</h1>
      <p className="mt-2 text-lg text-[#6B7280]">{t("subtitle")}</p>

      {articles.length === 0 ? (
        <div className="mt-16 rounded-xl border border-[#E5E7EB] bg-white p-12 text-center">
          <p className="text-[#6B7280]">{t("comingSoon")}</p>
        </div>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
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
                <h2 className="mt-3 font-semibold text-navy group-hover:text-steel">
                  {locale === "fa" ? a.titleFa : a.titleEn}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm text-[#6B7280]">
                  {locale === "fa" ? a.summaryFa : a.summaryEn}
                </p>
                <p className="mt-3 text-sm font-medium text-steel">
                  {locale === "fa" ? "بیشتر بخوانید ←" : "Read more →"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
