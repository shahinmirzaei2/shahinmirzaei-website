"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/AdminShell";
import ArticleForm from "@/components/ArticleForm";
import type { Article } from "@/lib/articles";

export default function EditArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [article, setArticle] = useState<Article | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/admin/articles/${slug}`)
      .then((res) => {
        if (res.status === 401) { router.push("/admin/login"); return null; }
        if (res.status === 404) { router.push("/admin/articles"); return null; }
        return res.json();
      })
      .then((data) => { if (data) setArticle(data); });
  }, [slug, router]);

  if (!article) {
    return (
      <AdminShell>
        <p className="text-[#6B7280]">در حال بارگذاری...</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <h1 className="mb-8 text-2xl font-bold">ویرایش مقاله</h1>
      <ArticleForm initial={article} />
    </AdminShell>
  );
}
