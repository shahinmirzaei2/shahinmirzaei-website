"use client";

import AdminShell from "@/components/AdminShell";
import Link from "next/link";
import { FileText, Newspaper } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <AdminShell>
      <h1 className="text-2xl font-bold">داشبورد</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <Link
          href="/admin/articles"
          className="flex items-center gap-4 rounded-xl border border-[#E5E7EB] bg-white p-6 transition-colors hover:border-steel"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-steel/10">
            <FileText className="h-6 w-6 text-steel" />
          </div>
          <div>
            <p className="font-semibold text-navy">مقالات</p>
            <p className="text-sm text-[#6B7280]">مدیریت مقالات سایت</p>
          </div>
        </Link>
        <Link
          href="/admin/news"
          className="flex items-center gap-4 rounded-xl border border-[#E5E7EB] bg-white p-6 transition-colors hover:border-steel"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-steel/10">
            <Newspaper className="h-6 w-6 text-steel" />
          </div>
          <div>
            <p className="font-semibold text-navy">اخبار</p>
            <p className="text-sm text-[#6B7280]">مدیریت اخبار سایت</p>
          </div>
        </Link>
      </div>
    </AdminShell>
  );
}
