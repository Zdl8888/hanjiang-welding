export default function TrustBadges() {
  const badges = [
    { label: "CE Certified", icon: "✓" },
    { label: "ISO 9001", icon: "✓" },
    { label: "Free Sample", icon: "✓" },
    { label: "Fast Shipping", icon: "✓" },
  ];

  return (
    <div className="bg-zinc-950 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-center gap-8">
        {badges.map((b) => (
          <div key={b.label} className="flex items-center gap-2 text-sm text-gray-400">
            <span className="text-orange-400 font-bold text-xs">{b.icon}</span>
            {b.label}
          </div>
        ))}
      </div>
    </div>
  );
}
