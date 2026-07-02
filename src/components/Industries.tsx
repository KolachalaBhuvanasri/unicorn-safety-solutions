const industries = [
  "Highways", "Road Construction", "Municipal Corporations", "Parking Lots",
  "Airports", "Factories", "Warehouses", "Schools", "Hospitals",
  "Shopping Malls", "Residential Projects", "Government Projects",
  "Metro Projects", "Industrial Estates",
];

export function Industries() {
  return (
    <section id="industries" className="relative bg-ink text-white py-24 sm:py-32 overflow-hidden">
      <div className="grid-noise absolute inset-0 opacity-10" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Industries we serve</div>
        <h2 className="mt-4 font-display text-4xl sm:text-6xl max-w-3xl leading-none">
          From city streets to<br/>industrial estates.
        </h2>

        <div className="mt-16 flex flex-wrap gap-3">
          {industries.map((i) => (
            <div
              key={i}
              className="group cursor-default rounded-full border border-white/20 bg-white/5 px-5 py-3 font-semibold text-sm hover:border-accent hover:bg-accent hover:text-ink transition"
            >
              {i}
            </div>
          ))}
        </div>
      </div>
      <div className="hazard-stripe h-1.5 mt-24" />
    </section>
  );
}
