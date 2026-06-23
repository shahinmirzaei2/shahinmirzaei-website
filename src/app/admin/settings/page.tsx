"use client";

import { useState } from "react";
import AdminShell from "@/components/AdminShell";
import { Lock, CheckCircle2, XCircle } from "lucide-react";

export default function AdminSettingsPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);

    if (newPassword.length < 6) {
      setResult({ ok: false, msg: "رمز جدید باید حداقل ۶ کاراکتر باشد" });
      return;
    }
    if (newPassword !== confirmPassword) {
      setResult({ ok: false, msg: "تکرار رمز عبور مطابقت ندارد" });
      return;
    }

    setSaving(true);
    const res = await fetch("/api/admin/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    if (res.status === 401) {
      window.location.href = "/admin/login";
      return;
    }

    if (res.ok) {
      setResult({ ok: true, msg: "رمز عبور با موفقیت تغییر کرد" });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else if (res.status === 403) {
      setResult({ ok: false, msg: "رمز عبور فعلی اشتباه است" });
    } else {
      setResult({ ok: false, msg: "خطا در تغییر رمز عبور" });
    }
    setSaving(false);
  }

  const inputClass =
    "mt-2 w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-steel";

  return (
    <AdminShell>
      <h1 className="text-2xl font-bold text-navy">تنظیمات</h1>

      <div className="mt-8 max-w-lg">
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-steel/10">
              <Lock className="h-5 w-5 text-steel" />
            </div>
            <div>
              <h2 className="font-bold text-navy">تغییر رمز عبور</h2>
              <p className="text-xs text-[#6B7280]">رمز ورود به پنل مدیریت را تغییر دهید</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy">رمز عبور فعلی</label>
              <input
                type="password"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy">رمز عبور جدید</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy">تکرار رمز عبور جدید</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={inputClass}
              />
            </div>

            {result && (
              <div className={`flex items-center gap-2 rounded-lg p-3 text-sm ${
                result.ok ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
              }`}>
                {result.ok ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                {result.msg}
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-steel px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-steel/85 disabled:opacity-50"
            >
              {saving ? "در حال ذخیره..." : "تغییر رمز عبور"}
            </button>
          </form>
        </div>
      </div>
    </AdminShell>
  );
}
