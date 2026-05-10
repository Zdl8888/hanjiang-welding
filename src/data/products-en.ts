export interface ProductEn {
  slug: string;
  name: string;
  desc: string;
  tags: string[];
  fullDesc: string[];
  specs: Record<string, string>;
  features: string[];
}

export const productsEn: ProductEn[] = [
  {
    slug: "ws-315",
    name: "TIG Welder WS-315",
    desc: "Full digital inverter technology, stable current, beautiful weld formation. Ideal for stainless steel and carbon steel thin plate precision welding.",
    tags: ["TIG", "Inverter", "Precision"],
    fullDesc: [
      "The WS-315 adopts full digital inverter technology with imported IGBT power modules, delivering stable output current and excellent arc stiffness. Suitable for precision welding of stainless steel, carbon steel, and alloy steel.",
      "Triple-proof coating process ensures reliable operation in high humidity and dusty environments. Features high-frequency arc ignition with 99%+ success rate.",
    ],
    specs: {
      "Input Voltage": "AC 380V ±15%",
      "Rated Input Power": "12.8 KVA",
      "Output Current Range": "10-315 A",
      "Rated Duty Cycle": "60%",
      "Protection Class": "IP21S",
      "Insulation Class": "F",
      "Cooling": "Air Cooling",
      "Weight": "~28 kg",
    },
    features: ["Imported IGBT power modules", "HF arc ignition, 99%+ success rate", "Triple-proof coating for harsh environments", "Optional pulse function for thin plate welding"],
  },
  {
    slug: "nb-500",
    name: "MIG/MAG Welder NB-500",
    desc: "High-power wire feeder, high efficiency, low spatter. Widely used in steel structure and shipbuilding industries.",
    tags: ["MIG/MAG", "High Power", "Industrial"],
    fullDesc: [
      "The NB-500 is an industrial-grade CO2/MAG welding machine with a high-power wire feeder, delivering stable wire feeding speed and excellent welding efficiency. Widely used in steel structures, shipbuilding, and bridge engineering.",
      "Supports both solid wire and flux-cored wire modes with excellent spatter control and beautiful weld formation. Built-in inductance adjustment optimizes arc characteristics for different welding positions.",
    ],
    specs: {
      "Input Voltage": "AC 380V ±15%",
      "Rated Input Power": "24 KVA",
      "Output Current Range": "60-500 A",
      "Output Voltage Range": "17-39 V",
      "Wire Diameter": "1.0 / 1.2 / 1.6 mm",
      "Rated Duty Cycle": "100%",
      "Protection Class": "IP23",
      "Weight": "~45 kg",
    },
    features: ["High-power wire feeder, stable feeding", "Dual mode: solid & flux-cored wire", "Excellent spatter control", "Built-in inductance adjustment"],
  },
  {
    slug: "zx7-400",
    name: "ARC Welder ZX7-400",
    desc: "Portable design, adapts to harsh working conditions. Supports multiple electrode types. Ideal for construction sites and field operations.",
    tags: ["MMA/ARC", "Portable", "Multi-Electrode"],
    fullDesc: [
      "The ZX7-400 is a portable inverter MMA welding machine weighing only 8kg, easy to carry. Supports acid, basic, and cellulose electrodes, adapting to construction sites, outdoor, and high-altitude operations.",
      "Features anti-stick, arc force, and hot start functions, significantly reducing spatter and improving arc stability. Wide voltage adaptation range allows generator power supply.",
    ],
    specs: {
      "Input Voltage": "AC 220/380V Dual Voltage",
      "Rated Input Power": "18 KVA",
      "Output Current Range": "20-400 A",
      "Electrode Diameter": "2.5 / 3.2 / 4.0 / 5.0 mm",
      "Rated Duty Cycle": "60%",
      "Protection Class": "IP23",
      "Insulation Class": "F",
      "Weight": "~8 kg",
    },
    features: ["Only 8kg, extremely portable", "220V/380V dual voltage auto-detection", "Anti-stick, arc force & hot start", "Generator compatible for field operations"],
  },
  {
    slug: "cut-100",
    name: "Plasma Cutter CUT-100",
    desc: "High-efficiency plasma arc cutting, clean cuts with fast speed. Cuts stainless steel, aluminum, and copper plates.",
    tags: ["Plasma", "Cutting", "High Speed"],
    fullDesc: [
      "The CUT-100 plasma cutter uses HF arc ignition technology for fast cutting speed and clean cuts with no secondary grinding required. Suitable for cutting stainless steel, carbon steel, aluminum, and copper.",
      "Equipped with an automatic gas-electric integrated torch for easy operation. Features grid cutting mode and arc-break protection to extend consumable life.",
    ],
    specs: {
      "Input Voltage": "AC 380V ±15%",
      "Rated Input Power": "15 KVA",
      "Cutting Current Range": "20-100 A",
      "Max Cutting Thickness": "SS 35mm / CS 40mm",
      "Rated Duty Cycle": "60%",
      "Protection Class": "IP23",
      "Cooling": "Air Cooling",
      "Weight": "~32 kg",
    },
    features: ["HF arc ignition, fast cutting speed", "Clean cuts, no secondary grinding", "Grid cutting + arc-break protection", "Cuts stainless steel, aluminum, copper & more"],
  },
  {
    slug: "wsm-200p",
    name: "Pulse TIG Welder WSM-200P",
    desc: "Precise pulse heat input control, ideal for thin plate welding. Minimal deformation, high appearance quality.",
    tags: ["Pulse", "TIG", "Thin Plate"],
    fullDesc: [
      "The WSM-200P pulse TIG welder uses advanced pulse control technology for precise heat input control, significantly reducing welding deformation with beautiful weld appearance. Ideal for high-quality welding of stainless steel and titanium alloy thin plates.",
      "Independent adjustment of pulse frequency, duty cycle, and base current to meet different process requirements. Widely used in medical devices, food equipment, and precision instruments.",
    ],
    specs: {
      "Input Voltage": "AC 220V ±15%",
      "Rated Input Power": "4.5 KVA",
      "Output Current Range": "5-200 A",
      "Pulse Frequency Range": "0.5-500 Hz",
      "Rated Duty Cycle": "60%",
      "Protection Class": "IP21S",
      "Insulation Class": "F",
      "Weight": "~15 kg",
    },
    features: ["Pulse control for precise heat input", "Minimal deformation on thin plates", "Independent frequency/duty/base current adjustment", "Ideal for medical & food equipment industries"],
  },
  {
    slug: "dhj-630",
    name: "Digital Welder DHJ-630",
    desc: "Full digital control system with preset welding parameters. One-touch process recall reduces operator skill requirements.",
    tags: ["Digital", "Smart", "One-Touch"],
    fullDesc: [
      "The DHJ-630 is Hanjiang's flagship fully digital welding machine, equipped with a 32-bit ARM processor and 100 preset welding process parameters with one-touch recall. Covers TIG, MMA, and carbon arc gouging modes.",
      "Features a 7-inch color touch screen displaying real-time current, voltage, and welding speed. USB data export enables process traceability and quality control.",
    ],
    specs: {
      "Input Voltage": "AC 380V ±15%",
      "Rated Input Power": "28 KVA",
      "Output Current Range": "10-630 A",
      "Welding Modes": "TIG / MMA / Carbon Arc Gouging",
      "Preset Programs": "100 programs",
      "Display": "7-inch Color Touch Screen",
      "Protection Class": "IP23",
      "Weight": "~55 kg",
    },
    features: ["32-bit ARM processor, full digital control", "100 preset welding process programs", "7-inch color touch screen", "USB data export for process traceability"],
  },
];

export function getProductBySlugEn(slug: string): ProductEn | undefined {
  return productsEn.find((p) => p.slug === slug);
}
