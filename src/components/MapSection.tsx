import { MapPin } from "lucide-react";

export function MapSection() {
  return (
    <section className="py-24 sm:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Visit Us</div>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl leading-none">Find our office.</h2>
          </div>
          <div className="flex items-start gap-3 text-muted-foreground max-w-sm">
            <MapPin className="h-5 w-5 text-accent shrink-0 mt-1" />
            <div>
              <div className="font-display text-lg text-foreground">JM Enterprises</div>
              H.No.6-7-49/2, Bansilalpet, Secunderabad – 500003, Telangana, India
            </div>
          </div>
        </div>
        <div className="aspect-[16/8] overflow-hidden rounded-2xl border border-border shadow-hard">
          <iframe
            title="JM Enterprises Location"
            src="https://www.google.com/maps?q=Bansilalpet,Secunderabad&output=embed"
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
