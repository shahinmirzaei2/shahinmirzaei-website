import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getPublishedNews } from "@/lib/news";

export const dynamic = "force-dynamic";

export default function NewsPage() {
  const locale = useLocale();
  const news = getPublishedNews();

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="text-3xl font-bold text-navy">
        {locale === "fa" ? "اخبار" : "News"}
      </h1>
      <p className="mt-2 text-lg text-[#6B7280]">
        {locale === "fa" ? "آخرین اخبار و رویدادها" : "Latest news and events"}
      </p>

      {news.length === 0 ? (
        <div className="mt-16 rounded-xl border border-[#E5E7EB] bg-white p-12 text-center">
          <p className="text-[#6B7280]">
            {locale === "fa" ? "اخبار به زودی منتشر خواهند شد." : "News coming soon."}
          </p>
        </div>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((n) => (
            <Link key={n.slug} href={`/news/${n.slug}`} className="group overflow-hidden rounded-xl border border-[#E5E7EB] bg-white transition-colors hover:border-steel">
              {n.coverImage && (
                <div className="aspect-video overflow-hidden">
                  <img src={n.coverImage} alt="" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-steel/10 px-2.5 py-0.5 text-xs font-medium text-steel">{n.category}</span>
                  <span className="text-xs text-[#6B7280]">{n.publishedAt}</span>
                </div>
                <h2 className="mt-3 font-semibold text-navy group-hover:text-steel">{n.titleFa}</h2>
                {n.summaryFa && <p className="mt-2 line-clamp-2 text-sm text-[#6B7280]">{n.summaryFa}</p>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
