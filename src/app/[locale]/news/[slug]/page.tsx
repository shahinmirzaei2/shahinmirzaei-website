import { notFound } from "next/navigation";
import { getNewsBySlug } from "@/lib/news";

export const dynamic = "force-dynamic";

export default async function NewsItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item || item.status !== "published") notFound();

  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      {item.coverImage && (
        <div className="mb-8 overflow-hidden rounded-xl">
          <img src={item.coverImage} alt="" className="max-h-[400px] w-full object-cover" />
        </div>
      )}

      <div className="flex items-center gap-3">
        <span className="rounded-full bg-steel/10 px-3 py-1 text-xs font-medium text-steel">{item.category}</span>
        <span className="text-sm text-[#6B7280]">{item.publishedAt}</span>
      </div>

      <h1 className="mt-4 text-3xl font-bold text-navy md:text-4xl">{item.titleFa}</h1>

      {item.gallery.length > 0 && (
        <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
          {item.gallery.map((url, i) => (
            <img key={i} src={url} alt="" className="h-32 flex-shrink-0 rounded-lg object-cover" />
          ))}
        </div>
      )}

      <div
        className="prose prose-lg mt-10 max-w-none text-navy prose-headings:text-navy prose-a:text-steel"
        dangerouslySetInnerHTML={{ __html: item.bodyFa }}
      />
    </article>
  );
}
