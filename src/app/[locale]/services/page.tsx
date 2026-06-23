import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Map,
  Settings,
  Brain,
  Bot,
  Layers,
  BarChart2,
  Shield,
  Briefcase,
  GraduationCap,
} from "lucide-react";

const SERVICES = [
  { key: "digitalStrategy", icon: Map },
  { key: "bpm", icon: Settings },
  { key: "aiStrategy", icon: Brain },
  { key: "aiAutomation", icon: Bot },
  { key: "digitalProduct", icon: Layers },
  { key: "bi", icon: BarChart2 },
  { key: "governance", icon: Shield },
  { key: "pmo", icon: Briefcase },
  { key: "training", icon: GraduationCap },
] as const;

export default function ServicesPage() {
  const t = useTranslations();

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="text-center text-3xl font-bold text-navy">
          {t("services.title")}
        </h1>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="group rounded-xl border border-[#E5E7EB] bg-white p-6 transition-all hover:border-steel"
            >
              <Icon className="mb-4 h-7 w-7 text-steel" strokeWidth={1.5} />
              <h2 className="font-semibold text-navy">
                {t(`services.items.${key}.title`)}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
                {t(`services.items.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link
            href="/contact"
            className="inline-block rounded-lg bg-steel px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-steel/80"
          >
            {t("home.cta.button")}
          </Link>
        </div>
      </div>
    </section>
  );
}
