"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminShell from "@/components/AdminShell";
import { Pencil, Trash2, Plus } from "lucide-react";
import type { Article } from "@/lib/articles";

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/articles")
      .then((res) => {
        if (res.status === 401) {
          window.location.href = "/admin/login";
          return [];
        }
        return res.json();
      })
      .then((data) => {
        if (data) setArticles(data);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(slug: string) {
    if (!confirm("آیا از حذف این مقاله مطمئن هستید؟")) return;
    const res = await fetch(`/api/admin/articles/${slug}`, { method: "DELETE" });
    if (res.ok) {
      setArticles((prev) => prev.filter((a) => a.slug !== slug));
    }
  }

  return (
    <AdminShell>
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-navy">مقالات</h1>
        <a
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 rounded-lg bg-steel px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-steel/85"
        >
          <Plus className="h-4 w-4" />
          مقاله جدید
        </a>
      </div>

      {loading ? (
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-12 text-center">
          <p className="text-[#6B7280]">در حال بارگذاری...</p>
        </div>
      ) : articles.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#D1D5DB] bg-white p-16 text-center">
          <p className="text-lg font-medium text-navy">هنوز مقاله‌ای ثبت نشده</p>
          <p className="mt-2 text-sm text-[#6B7280]">برای شروع، یک مقاله جدید بسازید</p>
          <a
            href="/admin/articles/new"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-steel px-6 py-3 text-sm font-bold text-white hover:bg-steel/85"
          >
            <Plus className="h-4 w-4" />
            ساخت اولین مقاله
          </a>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-navy/[0.02]">
                <th className="px-4 py-3 text-start font-medium text-slate">تصویر</th>
                <th className="px-4 py-3 text-start font-medium text-slate">عنوان</th>
                <th className="px-4 py-3 text-start font-medium text-slate">دسته‌بندی</th>
                <th className="px-4 py-3 text-start font-medium text-slate">تاریخ</th>
                <th className="px-4 py-3 text-start font-medium text-slate">وضعیت</th>
                <th className="px-4 py-3 text-start font-medium text-slate">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a, i) => (
                <tr key={a.slug} className={`border-b border-[#E5E7EB] ${i % 2 === 1 ? "bg-navy/[0.01]" : ""}`}>
                  <td className="px-4 py-3">
                    {a.coverImage ? (
                      <img src={a.coverImage} alt="" className="h-14 w-14 rounded-lg object-cover" />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-navy/5 text-xs text-[#9CA3AF]">—</div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-navy">{a.titleFa}</p>
                    <p className="text-xs text-[#6B7280]" dir="ltr">{a.titleEn}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-steel/10 px-2.5 py-0.5 text-xs font-medium text-steel">{a.category}</span>
                  </td>
                  <td className="px-4 py-3 text-[#6B7280]">{a.publishedAt}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      a.status === "published" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"
                    }`}>
                      {a.status === "published" ? "منتشر شده" : "پیش‌نویس"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <a href={`/admin/articles/edit/${a.slug}`} className="rounded-lg p-1.5 text-slate hover:bg-navy/5 hover:text-steel">
                        <Pencil className="h-4 w-4" />
                      </a>
                      <button onClick={() => handleDelete(a.slug)} className="rounded-lg p-1.5 text-slate hover:bg-red-50 hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
