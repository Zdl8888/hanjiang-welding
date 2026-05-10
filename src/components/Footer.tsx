const navLinks = [
  { label: "产品中心", href: "#products" },
  { label: "技术优势", href: "#features" },
  { label: "关于我们", href: "#about" },
  { label: "联系我们", href: "#contact" },
  { label: "在线支付", href: "#payment" },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* 品牌信息 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">悍</span>
              </div>
              <span className="text-white font-bold tracking-wider">悍将焊机</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              专注高品质焊接设备研发与制造
              <br />
              为每一道焊缝负责
            </p>
          </div>

          {/* 快速导航 */}
          <div>
            <h4 className="text-white font-semibold mb-4">快速导航</h4>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-gray-500 hover:text-orange-400 transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 联系方式 */}
          <div>
            <h4 className="text-white font-semibold mb-4">联系方式</h4>
            <div className="space-y-2 text-sm text-gray-500">
              <p>电话：19228284544（上海）</p>
              <p>邮箱：2381821791@qq.com</p>
              <p>地址：XX省XX市XX工业区</p>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-6 text-center text-xs text-gray-600">
          &copy; {new Date().getFullYear()} 悍将焊机 版权所有
        </div>
      </div>
    </footer>
  );
}
