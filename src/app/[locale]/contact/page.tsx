"use client";

import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin } from "lucide-react";

const SERVICE_KEYS = [
  "digitalStrategy",
  "bpm",
  "aiStrategy",
  "aiAutomation",
  "digitalProduct",
  "bi",
  "governance",
  "pmo",
  "training",
] as const;

export default function ContactPage() {
  const t = useTranslations();

  const inputClass =
    "mt-2 w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-steel";

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="text-3xl font-bold text-navy">{t("contact.title")}</h1>
      <p className="mt-2 text-lg text-[#6B7280]">{t("contact.subtitle")}</p>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {/* Form */}
        <form
          className="order-2 lg:order-1 lg:col-span-2 rounded-xl border border-[#E5E7EB] bg-white p-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-navy">
                  {t("contact.form.name")}
                </label>
                <input type="text" required className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy">
                  {t("contact.form.company")}
                </label>
                <input type="text" className={inputClass} />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-navy">
                  {t("contact.form.email")}
                </label>
                <input type="email" required className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy">
                  {t("contact.form.service")}
                </label>
                <select className={inputClass}>
                  <option value="">{t("contact.form.selectService")}</option>
                  {SERVICE_KEYS.map((key) => (
                    <option key={key} value={key}>
                      {t(`services.items.${key}.title`)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy">
                {t("contact.form.message")}
              </label>
              <textarea rows={6} required className={inputClass} />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-steel px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-steel/80"
            >
              {t("contact.form.submit")}
            </button>
          </div>
        </form>

        {/* Info card */}
        <div className="order-1 lg:order-2 rounded-xl bg-navy p-8 text-white">
          <h3 className="text-lg font-bold">{t("contact.info.title")}</h3>
          <div className="mt-8 space-y-6">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 text-steel" />
              <div>
                <p className="text-sm text-muted">{t("contact.info.email")}</p>
                <p className="mt-1 text-sm" dir="ltr">shahinmirzaei@aut.ac.ir</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 text-steel" />
              <div>
                <p className="text-sm text-muted">{t("contact.info.phone")}</p>
                <p className="mt-1 text-sm" dir="ltr">09123135494</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-steel" />
              <div>
                <p className="text-sm text-muted">{t("contact.info.location")}</p>
                <p className="mt-1 text-sm">{t("contact.info.locationValue")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
