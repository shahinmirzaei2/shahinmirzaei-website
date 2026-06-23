"use client";

import { usePathname } from "next/navigation";
import { Home, FileText, Newspaper, Settings, LogOut } from "lucide-react";

const MENU = [
  { href: "/admin", label: "داشبورد", icon: Home, exact: true },
  { href: "/admin/articles", label: "مقالات", icon: FileText, exact: false },
  { href: "/admin/news", label: "اخبار", icon: Newspaper, exact: false },
  { href: "/admin/settings", label: "تنظیمات", icon: Settings, exact: true },
] as const;

export default function AdminSidebar() {
  const pathname = usePathname();

  function handleLogout() {
    document.cookie = "admin_token=; path=/; max-age=0";
    window.location.href = "/admin/login";
  }

  return (
    <aside className="fixed inset-y-0 start-0 z-40 flex w-56 flex-col bg-navy" dir="rtl">
      <div className="border-b border-white/10 px-5 py-5">
        <p className="text-lg font-bold text-white">پنل مدیریت</p>
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {MENU.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <li key={href}>
                <a
                  href={href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    active
                      ? "bg-steel text-white"
                      : "text-white/50 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="h-[18px] w-[18px]" />
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/10 px-3 py-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/50 transition-colors hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-[18px] w-[18px]" />
          خروج
        </button>
      </div>
    </aside>
  );
}
