const navLinks = [
  { label: "Products", href: "#products" },
  { label: "Features", href: "#features" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function FooterEn() {
  return (
    <footer className="border-t border-zinc-800 bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">HJ</span>
              </div>
              <span className="text-white font-bold tracking-wider">Hanjiang Welding</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Professional welding equipment manufacturer
              <br />
              Quality you can trust
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-gray-500 hover:text-orange-400 transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-gray-500">
              <p>Phone: +86 19228284544</p>
              <p>Email: 2381821791@qq.com</p>
              <p>Add: XX Industrial Zone, China</p>
            </div>
          </div>
        </div>
        <div className="border-t border-zinc-800 pt-6 text-center text-xs text-gray-600">
          &copy; {new Date().getFullYear()} Hanjiang Welding Machine. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
