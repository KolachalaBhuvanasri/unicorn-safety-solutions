import { Award, ShieldCheck, FileCheck2, Building2, BadgeCheck } from "lucide-react";

const certs = [
  { icon: Award, label: "ISO Certified" },
  { icon: FileCheck2, label: "GST Registered" },
  { icon: Building2, label: "MSME Registered" },
  { icon: ShieldCheck, label: "Government Supplier" },
  { icon: BadgeCheck, label: "Quality Tested" },
];

export function Certifications() {
  return (
    <section className="border-y border-border bg-secondary py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {certs.map((c) => (
            <div key={c.label} className="flex items-center gap-3">
              <c.icon className="h-8 w-8 text-accent" />
              <span className="font-display text-lg uppercase tracking-wide">{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
