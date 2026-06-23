import { useTranslations } from "next-intl";
import { Code, Users, Monitor, Building2, Compass } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const TIMELINE: { key: string; icon: LucideIcon }[] = [
  { key: "developer", icon: Code },
  { key: "techLead", icon: Users },
  { key: "manager", icon: Monitor },
  { key: "ceo", icon: Building2 },
  { key: "consultant", icon: Compass },
];

export default function AboutPage() {
  const t = useTranslations("about");
  const skills = t.raw("skills.items") as string[];

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="text-3xl font-bold text-navy">{t("title")}</h1>
      <p className="mt-2 text-lg text-steel">{t("subtitle")}</p>
      <p className="mt-8 max-w-3xl leading-relaxed text-[#6B7280]">
        {t("story")}
      </p>

      {/* Timeline */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold text-navy">{t("timeline.title")}</h2>
        <div className="mt-10 space-y-0">
          {TIMELINE.map(({ key, icon: Icon }, i) => (
            <div key={key} className="flex items-stretch gap-6">
              {/* Icon column */}
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-steel bg-offwhite">
                  <Icon className="h-5 w-5 text-steel" strokeWidth={2} />
                </div>
                {i < TIMELINE.length - 1 && (
                  <div className="w-0.5 flex-1 bg-[#E5E7EB]" />
                )}
              </div>
              {/* Text column */}
              <div className={`pt-3 ${i < TIMELINE.length - 1 ? "pb-8" : ""}`}>
                <p className="font-semibold text-navy">
                  {t(`timeline.${key}`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold text-navy">{t("skills.title")}</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {skills.map((skill: string) => (
            <span
              key={skill}
              className="rounded-lg border border-steel/20 bg-steel/5 px-4 py-2 text-sm font-medium text-steel"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
