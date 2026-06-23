"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/articles");
    } else {
      setError("رمز عبور اشتباه است");
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-white">ورود به پنل مدیریت</h1>
        <p className="mt-2 text-sm text-muted">Admin Panel</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted">ایمیل</label>
            <input
              type="email"
              defaultValue="shahinmirzaei@aut.ac.ir"
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-steel"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted">رمز عبور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-steel"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-steel px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-steel/80 disabled:opacity-50"
          >
            {loading ? "..." : "ورود"}
          </button>
        </form>
      </div>
    </div>
  );
}
