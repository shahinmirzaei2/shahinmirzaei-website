"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

export default function AdminShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    fetch("/api/admin/articles")
      .then((res) => {
        if (res.status === 401) {
          router.push("/admin/login");
        } else {
          setOk(true);
        }
      })
      .catch(() => router.push("/admin/login"));
  }, [router]);

  if (!ok) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted">در حال بارگذاری...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 ps-56">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
