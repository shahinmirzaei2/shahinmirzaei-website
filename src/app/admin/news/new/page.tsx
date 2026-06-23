"use client";

import AdminShell from "@/components/AdminShell";
import NewsForm from "@/components/NewsForm";

export default function NewNewsPage() {
  return (
    <AdminShell>
      <h1 className="mb-8 text-2xl font-bold">خبر جدید</h1>
      <NewsForm />
    </AdminShell>
  );
}
