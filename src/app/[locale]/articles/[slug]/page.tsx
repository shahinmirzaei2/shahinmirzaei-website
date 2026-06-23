import { notFound } from "next/navigation";
import { useLocale } from "next-intl";
import { getArticleBySlug, getPublishedArticles } from "@/lib/articles";

export const dynamic = "force-dynamic";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article || article.status !== "published") notFound();

  return <ArticleContent article={article} />;
}

function ArticleContent({ article }: { article: ReturnType<typeof getArticleBySlug> & {} }) {
  const locale = useLocale();
  const title = locale === "fa" ? article.titleFa : article.titleEn;
  const body = locale === "fa" ? article.bodyFa : article.bodyEn;

  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      {article.coverImage && (
        <div className="mb-8 overflow-hidden rounded-xl">
          <img src={article.coverImage} alt="" className="max-h-[400px] w-full object-cover" />
        </div>
      )}

      <div className="flex items-center gap-3">
        <span className="rounded-full bg-steel/10 px-3 py-1 text-xs font-medium text-steel">{article.category}</span>
        <span className="text-sm text-[#6B7280]">{article.publishedAt}</span>
      </div>

      <h1 className="mt-4 text-3xl font-bold text-navy md:text-4xl">{title}</h1>

      {article.gallery.length > 0 && (
        <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
          {article.gallery.map((url, i) => (
            <img key={i} src={url} alt="" className="h-32 flex-shrink-0 rounded-lg object-cover" />
          ))}
        </div>
      )}

      <div
        className="prose prose-lg mt-10 max-w-none text-navy prose-headings:text-navy prose-a:text-steel"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </article>
  );
}
