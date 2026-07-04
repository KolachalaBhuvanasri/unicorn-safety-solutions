import { Star } from "lucide-react";

const t = [
  { name: "Ravi Kumar", role: "Project Manager, NH Contractor", rating: 5, text: "Excellent quality products and timely delivery. JM Enterprises delivered 5000+ cones for our highway project on schedule." },
  { name: "S. Mehta", role: "Municipal Engineer", rating: 4, text: "Very good quality. Delivery was slightly delayed but the UNICORN brand speed humps have held up exceptionally well." },
  { name: "Anita Rao", role: "Warehouse Ops Lead", rating: 4, text: "Reliable PPE quality and responsive support team. Bulk orders arrive well-packed and on time in most cases." },
  { name: "Deepak Singh", role: "Factory Head", rating: 3, text: "Products were good and priced competitively, but installation guidance took longer than expected to arrange." },
  { name: "Praveen Iyer", role: "Site Supervisor, Metro Project", rating: 5, text: "Highly recommended for road safety equipment. Reflectivity and finish are top-notch, exactly as specified." },
  { name: "Meena Joshi", role: "Procurement Officer", rating: 4, text: "Professional service and durable products. Their team handled our government tender documentation smoothly." },
  { name: "Arjun Nair", role: "Civil Contractor", rating: 3, text: "Decent products overall. Would appreciate faster response times on custom manufacturing quotes." },
  { name: "Vikram Shetty", role: "Safety Officer, Logistics", rating: 5, text: "Been sourcing PPE from JM for three years — consistent quality, fair pricing, and honest communication." },
];

export function Testimonials() {
  return (
    <section className="py-24 sm:py-32 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Testimonials</div>
        <h2 className="mt-4 font-display text-4xl sm:text-6xl leading-none">What clients say.</h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {t.map((x) => (
            <div key={x.name} className="flex h-full flex-col rounded-xl bg-background border border-border p-6 hover:shadow-hard transition">
              <div className="flex gap-1 text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < x.rating ? "fill-current" : "text-muted-foreground/40"}`}
                  />
                ))}
              </div>
              <p className="mt-4 text-base leading-relaxed flex-1">"{x.text}"</p>
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
