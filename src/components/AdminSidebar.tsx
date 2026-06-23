"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, FileText, Newspaper, LogOut } from "lucide-react";

const MENU = [
  { href: "/admin", label: "داشبورد", icon: Home },
  { href: "/admin/articles", label: "مقالات", icon: FileText },
  { href: "/admin/news", label: "اخبار", icon: Newspaper },
] as const;

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    document.cookie = "admin_token=; path=/; max-age=0";
    router.push("/admin/login");
  }

  return (
    <aside className="fixed inset-y-0 start-0 z-40 flex w-56 flex-col bg-navy" dir="rtl">
      <div className="border-b border-white/10 px-5 py-5">
        <p className="text-lg font-bold text-white">پنل مدیریت</p>
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {MENU.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    active
                      ? "bg-steel text-white"
                      : "text-muted hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/10 px-3 py-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted transition-colors hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-4.5 w-4.5" />
          خروج
        </button>
      </div>
    </aside>
  );
}
