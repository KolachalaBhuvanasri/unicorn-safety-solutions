import { Star } from "lucide-react";

const t = [
  { name: "Ravi Kumar", role: "Project Manager, NH Contractor", text: "JM Enterprises delivered 5000+ cones for our highway project on time. Quality and reflectivity are top-notch." },
  { name: "S. Mehta", role: "Municipal Engineer", text: "We've been sourcing speed humps and studs from JM for years. Their UNICORN brand is our go-to for public projects." },
  { name: "Anita Rao", role: "Warehouse Ops Lead", text: "Excellent PPE quality and fast bulk delivery. Their support team is responsive and professional." },
  { name: "Deepak Singh", role: "Factory Head", text: "Custom manufacturing capability and factory-direct pricing gave us serious cost savings." },
];

export function Testimonials() {
  return (
    <section className="py-24 sm:py-32 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Testimonials</div>
        <h2 className="mt-4 font-display text-4xl sm:text-6xl leading-none">What clients say.</h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {t.map((x) => (
            <div key={x.name} className="rounded-xl bg-background border border-border p-8 hover:shadow-hard transition">
              <div className="flex gap-1 text-accent">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-4 text-lg leading-relaxed">"{x.text}"</p>
              <div className="mt-6 border-t border-border pt-4">
                <div className="font-display text-lg">{x.name}</div>
                <div className="text-sm text-muted-foreground">{x.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
