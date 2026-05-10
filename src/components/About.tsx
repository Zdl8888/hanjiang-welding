const stats = [
  { value: "20+", label: "年行业经验" },
  { value: "50+", label: "产品型号" },
  { value: "10000+", label: "服务客户" },
  { value: "300+", label: "服务网点" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 左侧：占位图片 */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-center overflow-hidden">
              <div className="text-center text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-3 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="text-xs text-zinc-500">公司图片 / 工厂照片待添加</span>
              </div>
            </div>
            {/* 装饰框 */}
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-xl border border-orange-500/20 -z-10" />
          </div>

          {/* 右侧：文字 */}
          <div>
            <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-6">
              关于悍将焊机
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              悍将焊机专注高品质焊接设备研发与制造，自2005年成立以来，始终坚持"以品质悍动未来"的经营理念。
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              公司拥有20000平方米现代化生产基地，配备全自动SMT贴片线、三防涂覆车间、72小时满载老化测试系统。核心部件选用英飞凌IGBT、西门子MCU等国际一线品牌，从源头保障产品品质。
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              目前产品远销东南亚、中东、南美等30多个国家和地区，服务超过10000家工业客户，涵盖钢结构、船舶制造、压力容器、汽车维修等行业。
            </p>

            {/* 数据 */}
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
