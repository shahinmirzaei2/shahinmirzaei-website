"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { SingleImageUpload, GalleryUpload } from "./ImageUpload";

const RichEditor = dynamic(() => import("./RichEditor"), { ssr: false });

const CATEGORIES = [
  { value: "استراتژی", label: "استراتژی" },
  { value: "هوش مصنوعی", label: "هوش مصنوعی" },
  { value: "فرآیند", label: "فرآیند" },
  { value: "مدیریت", label: "مدیریت" },
  { value: "بانکداری", label: "بانکداری" },
  { value: "عمومی", label: "عمومی" },
];

interface ArticleFormData {
  slug: string;
  titleFa: string;
  titleEn: string;
  summaryFa: string;
  summaryEn: string;
  bodyFa: string;
  bodyEn: string;
  category: string;
  coverImage: string;
  gallery: string[];
  publishedAt: string;
  status: "draft" | "published";
  createdAt?: string;
}

export default function ArticleForm({ initial }: { initial?: ArticleFormData }) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<ArticleFormData>(
    initial || {
      slug: "",
      titleFa: "",
      titleEn: "",
      summaryFa: "",
      summaryEn: "",
      bodyFa: "",
      bodyEn: "",
      category: "استراتژی",
      coverImage: "",
      gallery: [],
      publishedAt: new Date().toISOString().split("T")[0],
      status: "draft",
    }
  );

  function update<K extends keyof ArticleFormData>(key: K, value: ArticleFormData[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "titleEn") {
        next.slug = (value as string)
          .toLowerCase().trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-");
      }
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/articles/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.status === 401) { window.location.href = "/admin/login"; return; }
    if (res.ok) { alert("مقاله با موفقیت ذخیره شد"); window.location.href = "/admin/articles"; return; }
    setSaving(false);
  }

  const inputClass = "mt-2 w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 text-sm outline-none focus:border-steel";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Section 1: Basic Info */}
      <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
        <h2 className="mb-5 font-semibold text-navy">اطلاعات اصلی</h2>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-navy">عنوان فارسی</label>
              <input type="text" required value={form.titleFa} onChange={(e) => update("titleFa", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy">عنوان انگلیسی</label>
              <input type="text" required dir="ltr" value={form.titleEn} onChange={(e) => update("titleEn", e.target.value)} className={inputClass} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-navy">Slug</label>
            <input type="text" required dir="ltr" value={form.slug} onChange={(e) => update("slug", e.target.value)} className={`${inputClass} font-mono text-xs`} />
            {form.slug && <p className="mt-1 text-xs text-[#6B7280]" dir="ltr">/fa/articles/{form.slug}</p>}
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-navy">دسته‌بندی</label>
              <select value={form.category} onChange={(e) => update("category", e.target.value)} className={inputClass}>
                {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy">تاریخ انتشار</label>
              <input type="date" dir="ltr" value={form.publishedAt} onChange={(e) => update("publishedAt", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy">وضعیت</label>
              <div className="mt-4 flex gap-6">
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="status" value="draft" checked={form.status === "draft"} onChange={() => update("status", "draft")} className="accent-steel" />
                  پیش‌نویس
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="status" value="published" checked={form.status === "published"} onChange={() => update("status", "published")} className="accent-steel" />
                  منتشر شده
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Cover Image */}
      <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
        <h2 className="mb-5 font-semibold text-navy">تصویر کاور</h2>
        <SingleImageUpload
          label=""
          value={form.coverImage}
          folder="articles"
          slug={form.slug || "temp"}
          prefix="cover"
          onChange={(url) => update("coverImage", url)}
        />
      </div>

      {/* Section 3: Gallery */}
      <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
        <h2 className="mb-5 font-semibold text-navy">گالری تصاویر</h2>
        <GalleryUpload
          label=""
          images={form.gallery}
          folder="articles"
          slug={form.slug || "temp"}
          onChange={(urls) => update("gallery", urls)}
        />
      </div>

      {/* Section 4: Body FA */}
      <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
        <h2 className="mb-5 font-semibold text-navy">متن فارسی</h2>
        <RichEditor content={form.bodyFa} onChange={(html) => update("bodyFa", html)} dir="rtl" minHeight={400} placeholder="متن فارسی مقاله..." />
      </div>

      {/* Section 5: Body EN */}
      <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
        <h2 className="mb-5 font-semibold text-navy">متن انگلیسی</h2>
        <RichEditor content={form.bodyEn} onChange={(html) => update("bodyEn", html)} dir="ltr" minHeight={400} placeholder="English article body..." />
      </div>

      {/* Section 6: Summary */}
      <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
        <h2 className="mb-5 font-semibold text-navy">خلاصه</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-navy">خلاصه فارسی</label>
            <textarea rows={3} value={form.summaryFa} onChange={(e) => update("summaryFa", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy">Summary EN</label>
            <textarea rows={3} dir="ltr" value={form.summaryEn} onChange={(e) => update("summaryEn", e.target.value)} className={inputClass} />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="rounded-lg bg-steel px-8 py-3 text-sm font-semibold text-white hover:bg-steel/80 disabled:opacity-50">
          {saving ? "در حال ذخیره..." : "ذخیره مقاله"}
        </button>
        <a href="/admin/articles" className="rounded-lg border border-[#E5E7EB] px-8 py-3 text-sm text-slate hover:bg-navy/5">
          انصراف
        </a>
      </div>
    </form>
  );
}
