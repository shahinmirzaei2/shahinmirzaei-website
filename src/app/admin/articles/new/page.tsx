"use client";

import AdminShell from "@/components/AdminShell";
import ArticleForm from "@/components/ArticleForm";

export default function NewArticlePage() {
  return (
    <AdminShell>
      <h1 className="mb-8 text-2xl font-bold">مقاله جدید</h1>
      <ArticleForm />
    </AdminShell>
  );
}
