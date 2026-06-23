"use client";

import type { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";

export default function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 ps-56">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
