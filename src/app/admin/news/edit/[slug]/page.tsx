"use client";

import { useState, useEffect, use } from "react";
import AdminShell from "@/components/AdminShell";
import NewsForm from "@/components/NewsForm";
import type { NewsItem } from "@/lib/news";

export default function EditNewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [item, setItem] = useState<NewsItem | null>(null);

  useEffect(() => {
    fetch(`/api/admin/news/${slug}`)
      .then((res) => {
        if (res.status === 401) { window.location.href = "/admin/login"; return null; }
        if (res.status === 404) { window.location.href = "/admin/news"; return null; }
        return res.json();
      })
      .then((data) => { if (data) setItem(data); });
  }, [slug]);

  if (!item) {
    return (
      <AdminShell>
        <p className="text-[#6B7280]">در حال بارگذاری...</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <h1 className="mb-8 text-2xl font-bold">ویرایش خبر</h1>
      <NewsForm initial={item} />
    </AdminShell>
  );
}
