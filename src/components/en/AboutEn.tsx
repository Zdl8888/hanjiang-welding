const stats = [
  { value: "20+", label: "Years Experience" },
  { value: "50+", label: "Product Models" },
  { value: "10,000+", label: "Customers Served" },
  { value: "300+", label: "Service Outlets" },
];

export default function AboutEn() {
  return (
    <section id="about" className="relative py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/3] rounded-xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-center overflow-hidden">
              <div className="text-center text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-3 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="text-xs text-zinc-500">Factory Photo Coming Soon</span>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-xl border border-orange-500/20 -z-10" />
          </div>

          <div>
            <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase">About Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-6">About HanJang Welding</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              HanJang Welding focuses on high-quality welding equipment R&D and manufacturing. Since our founding in 2005, we have adhered to the philosophy of "Quality Drives the Future."
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              Our 20,000m² modern production base features fully automated SMT lines, triple-proof coating workshops, and 72-hour full-load burn-in testing systems. Core components use Infineon IGBTs and Siemens MCUs from international tier-1 brands.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Our products are exported to 30+ countries across Southeast Asia, the Middle East, and South America, serving over 10,000 industrial customers in steel structures, shipbuilding, pressure vessels, and automotive repair.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <div key={i} className="text-center p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
                  <div className="text-2xl font-bold text-orange-400">{s.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
