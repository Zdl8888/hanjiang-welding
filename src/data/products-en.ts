export interface VariantEn {
  name: string;
  image: string;
  price?: number;
  specs: Record<string, string>;
  features: string[];
}

export interface ProductEn {
  slug: string;
  name: string;
  image: string;
  desc: string;
  tags: string[];
  fullDesc: string[];
  variants: VariantEn[];
}

export const productsEn: ProductEn[] = [
  // ===== 1. TIG Welder WSM-400 =====
  {
    slug: "wsm-400",
    name: "TIG Welder WSM-400",
    image: "/products/wsm-400.png",
    desc: "Professional IGBT inverter TIG welder with smooth arc and high-frequency ignition. Designed for precision welding of stainless steel, carbon steel, and alloy steel. CE certified, factory direct from China.",
    tags: ["TIG Welder", "IGBT Inverter", "Precision", "Stainless Steel", "Industrial"],
    fullDesc: [
      "The WSM-400 TIG welder delivers precision arc control through advanced IGBT full digital inverter technology. Whether you're welding thin-gauge stainless steel, carbon steel, or alloy steel, the stable output current and excellent arc stiffness ensure consistent, professional results every time.",
      "With high-frequency arc ignition achieving a 99%+ success rate, independent pulse adjustment (frequency, duty cycle, and base current), and triple-proof coating for harsh workshop environments — this machine is built for reliability. ISO9001 certified and EU CE approved. Available in water-cooled and air-cooled configurations with 5m, 10m, or 15m cable kits.",
    ],
    variants: [
      {
        name: "WSM-400 Water 5m Kit",
        image: "/products/wsm-400.png",
        price: 734,
        specs: {
          "Model": "WSM-400",
          "Input Power": "3P 380V ±15%",
          "Frequency": "50/60 Hz",
          "Current Range": "20–400 A",
          "Rated Duty Cycle": "60%",
          "No-Load Voltage": "67V",
          "Inverter Frequency": "28 KHz",
          "Protection Class": "IP21S",
          "Insulation Class": "F",
          "Cooling": "Water",
          "Cable Length": "5m",
          "Dimensions": "485 × 245 × 420 mm",
          "Net Weight": "15.8 kg",
        },
        features: ["Imported IGBT power modules", "HF arc ignition, 99%+ success rate", "Triple-proof coating for harsh environments", "Optional pulse function for thin plate welding"],
      },
      {
        name: "WSM-400 Water 10m Kit",
        image: "/products/wsm-400.png",
        price: 750,
        specs: {
          "Model": "WSM-400",
          "Input Power": "3P 380V ±15%",
          "Frequency": "50/60 Hz",
          "Current Range": "20–400 A",
          "Rated Duty Cycle": "60%",
          "No-Load Voltage": "67V",
          "Inverter Frequency": "28 KHz",
          "Protection Class": "IP21S",
          "Insulation Class": "F",
          "Cooling": "Water",
          "Cable Length": "10m",
          "Dimensions": "485 × 245 × 420 mm",
          "Net Weight": "15.8 kg",
        },
        features: ["Imported IGBT power modules", "HF arc ignition, 99%+ success rate", "Triple-proof coating for harsh environments", "Optional pulse function for thin plate welding"],
      },
      {
        name: "WSM-400 Water 15m Kit",
        image: "/products/wsm-400.png",
        price: 765,
        specs: {
          "Model": "WSM-400",
          "Input Power": "3P 380V ±15%",
          "Frequency": "50/60 Hz",
          "Current Range": "20–400 A",
          "Rated Duty Cycle": "60%",
          "No-Load Voltage": "67V",
          "Inverter Frequency": "28 KHz",
          "Protection Class": "IP21S",
          "Insulation Class": "F",
          "Cooling": "Water",
          "Cable Length": "15m",
          "Dimensions": "485 × 245 × 420 mm",
          "Net Weight": "15.8 kg",
        },
        features: ["Imported IGBT power modules", "HF arc ignition, 99%+ success rate", "Triple-proof coating for harsh environments", "Optional pulse function for thin plate welding"],
      },
      {
        name: "WSM-400 Air 5m Kit",
        image: "/products/wsm-400.png",
        price: 750,
        specs: {
          "Model": "WSM-400",
          "Input Power": "3P 380V ±15%",
          "Frequency": "50/60 Hz",
          "Current Range": "20–400 A",
          "Rated Duty Cycle": "60%",
          "No-Load Voltage": "67V",
          "Inverter Frequency": "28 KHz",
          "Protection Class": "IP21S",
          "Insulation Class": "F",
          "Cooling": "Air",
          "Cable Length": "5m",
          "Dimensions": "485 × 245 × 420 mm",
          "Net Weight": "15.8 kg",
        },
        features: ["Imported IGBT power modules", "HF arc ignition, 99%+ success rate", "Triple-proof coating for harsh environments", "Optional pulse function for thin plate welding"],
      },
      {
        name: "WSM-400 Air 10m Kit",
        image: "/products/wsm-400.png",
        price: 765,
        specs: {
          "Model": "WSM-400",
          "Input Power": "3P 380V ±15%",
          "Frequency": "50/60 Hz",
          "Current Range": "20–400 A",
          "Rated Duty Cycle": "60%",
          "No-Load Voltage": "67V",
          "Inverter Frequency": "28 KHz",
          "Protection Class": "IP21S",
          "Insulation Class": "F",
          "Cooling": "Air",
          "Cable Length": "10m",
          "Dimensions": "485 × 245 × 420 mm",
          "Net Weight": "15.8 kg",
        },
        features: ["Imported IGBT power modules", "HF arc ignition, 99%+ success rate", "Triple-proof coating for harsh environments", "Optional pulse function for thin plate welding"],
      },
      {
        name: "WSM-400 Air 15m Kit",
        image: "/products/wsm-400.png",
        price: 780,
        specs: {
          "Model": "WSM-400",
          "Input Power": "3P 380V ±15%",
          "Frequency": "50/60 Hz",
          "Current Range": "20–400 A",
          "Rated Duty Cycle": "60%",
          "No-Load Voltage": "67V",
          "Inverter Frequency": "28 KHz",
          "Protection Class": "IP21S",
          "Insulation Class": "F",
          "Cooling": "Air",
          "Cable Length": "15m",
          "Dimensions": "485 × 245 × 420 mm",
          "Net Weight": "15.8 kg",
        },
        features: ["Imported IGBT power modules", "HF arc ignition, 99%+ success rate", "Triple-proof coating for harsh environments", "Optional pulse function for thin plate welding"],
      },
    ],
  },
  // ===== 2. Pulse TIG Welder WSM-400 =====
  {
    slug: "wsm-400-pulse",
    name: "Pulse TIG Welder WSM-400",
    image: "/products/wsm-400-pulse.jpg",
    desc: "IGBT full digital inverter pulse TIG welder with independent pulse frequency, duty cycle and base current control. Perfect for thin plate and stainless steel precision welding. Factory direct from China.",
    tags: ["Pulse TIG", "IGBT Inverter", "Thin Plate", "Precision", "Digital Pulse"],
    fullDesc: [
      "The WSM-400 Pulse series features IGBT full digital inverter and independent pulse control technology. Pulse frequency, duty cycle, and base current can all be independently adjusted for precise heat input control. Suitable for thin plate and precision welding of stainless steel, carbon steel, and alloy steel.",
      "Pulse function effectively reduces welding deformation with beautiful weld formation and minimal HAZ. Triple-proof coating ensures reliable operation in harsh environments. HF arc ignition success rate 99%+. ISO9001 and EU CE certified.",
    ],
    variants: [
      { name: "Pulse Water 5m Kit", image: "/products/wsm-400-pulse.jpg", price: 750, specs: { "Model": "WSM-400 (Pulse)", "Input Power": "3P 380V ±15%", "Frequency": "50/60 Hz", "Current Range": "10–400 A", "Pulse Frequency": "0.5–500 Hz", "Duty Cycle": "10%–90%", "Rated Duty Cycle": "60%", "No-Load Voltage": "67V", "Inverter Frequency": "28 KHz", "Protection Class": "IP21S", "Insulation Class": "F", "Cooling": "Water", "Cable Length": "5m", "Pulse Type": "Standard Pulse", "Dimensions": "485 × 245 × 420 mm", "Net Weight": "16.5 kg" }, features: ["Independent pulse control (frequency/duty/base)", "Imported IGBT power modules", "HF arc ignition, 99%+ success rate", "Precise heat input for thin plate welding", "Triple-proof coating for harsh environments"] },
      { name: "Pulse Water 10m Kit", image: "/products/wsm-400-pulse.jpg", price: 765, specs: { "Model": "WSM-400 (Pulse)", "Input Power": "3P 380V ±15%", "Frequency": "50/60 Hz", "Current Range": "10–400 A", "Pulse Frequency": "0.5–500 Hz", "Duty Cycle": "10%–90%", "Rated Duty Cycle": "60%", "No-Load Voltage": "67V", "Inverter Frequency": "28 KHz", "Protection Class": "IP21S", "Insulation Class": "F", "Cooling": "Water", "Cable Length": "10m", "Pulse Type": "Standard Pulse", "Dimensions": "485 × 245 × 420 mm", "Net Weight": "16.5 kg" }, features: ["Independent pulse control (frequency/duty/base)", "Imported IGBT power modules", "HF arc ignition, 99%+ success rate", "Precise heat input for thin plate welding", "Triple-proof coating for harsh environments"] },
      { name: "Pulse Water 15m Kit", image: "/products/wsm-400-pulse.jpg", price: 780, specs: { "Model": "WSM-400 (Pulse)", "Input Power": "3P 380V ±15%", "Frequency": "50/60 Hz", "Current Range": "10–400 A", "Pulse Frequency": "0.5–500 Hz", "Duty Cycle": "10%–90%", "Rated Duty Cycle": "60%", "No-Load Voltage": "67V", "Inverter Frequency": "28 KHz", "Protection Class": "IP21S", "Insulation Class": "F", "Cooling": "Water", "Cable Length": "15m", "Pulse Type": "Standard Pulse", "Dimensions": "485 × 245 × 420 mm", "Net Weight": "16.5 kg" }, features: ["Independent pulse control (frequency/duty/base)", "Imported IGBT power modules", "HF arc ignition, 99%+ success rate", "Precise heat input for thin plate welding", "Triple-proof coating for harsh environments"] },
      { name: "Pulse Air 5m Kit", image: "/products/wsm-400-pulse.jpg", price: 765, specs: { "Model": "WSM-400 (Pulse)", "Input Power": "3P 380V ±15%", "Frequency": "50/60 Hz", "Current Range": "10–400 A", "Pulse Frequency": "0.5–500 Hz", "Duty Cycle": "10%–90%", "Rated Duty Cycle": "60%", "No-Load Voltage": "67V", "Inverter Frequency": "28 KHz", "Protection Class": "IP21S", "Insulation Class": "F", "Cooling": "Air", "Cable Length": "5m", "Pulse Type": "Standard Pulse", "Dimensions": "485 × 245 × 420 mm", "Net Weight": "16.5 kg" }, features: ["Independent pulse control (frequency/duty/base)", "Imported IGBT power modules", "HF arc ignition, 99%+ success rate", "Precise heat input for thin plate welding", "Triple-proof coating for harsh environments"] },
      { name: "Pulse Air 10m Kit", image: "/products/wsm-400-pulse.jpg", price: 780, specs: { "Model": "WSM-400 (Pulse)", "Input Power": "3P 380V ±15%", "Frequency": "50/60 Hz", "Current Range": "10–400 A", "Pulse Frequency": "0.5–500 Hz", "Duty Cycle": "10%–90%", "Rated Duty Cycle": "60%", "No-Load Voltage": "67V", "Inverter Frequency": "28 KHz", "Protection Class": "IP21S", "Insulation Class": "F", "Cooling": "Air", "Cable Length": "10m", "Pulse Type": "Standard Pulse", "Dimensions": "485 × 245 × 420 mm", "Net Weight": "16.5 kg" }, features: ["Independent pulse control (frequency/duty/base)", "Imported IGBT power modules", "HF arc ignition, 99%+ success rate", "Precise heat input for thin plate welding", "Triple-proof coating for harsh environments"] },
      { name: "Pulse Air 15m Kit", image: "/products/wsm-400-pulse.jpg", price: 795, specs: { "Model": "WSM-400 (Pulse)", "Input Power": "3P 380V ±15%", "Frequency": "50/60 Hz", "Current Range": "10–400 A", "Pulse Frequency": "0.5–500 Hz", "Duty Cycle": "10%–90%", "Rated Duty Cycle": "60%", "No-Load Voltage": "67V", "Inverter Frequency": "28 KHz", "Protection Class": "IP21S", "Insulation Class": "F", "Cooling": "Air", "Cable Length": "15m", "Pulse Type": "Standard Pulse", "Dimensions": "485 × 245 × 420 mm", "Net Weight": "16.5 kg" }, features: ["Independent pulse control (frequency/duty/base)", "Imported IGBT power modules", "HF arc ignition, 99%+ success rate", "Precise heat input for thin plate welding", "Triple-proof coating for harsh environments"] },
      { name: "Digital Pulse Water 5m Kit", image: "/products/wsm-400-pulse.jpg", price: 960, specs: { "Model": "WSM-400 (Digital Pulse)", "Input Power": "3P 380V ±15%", "Frequency": "50/60 Hz", "Current Range": "10–400 A", "Pulse Frequency": "0.5–500 Hz", "Duty Cycle": "10%–90%", "Rated Duty Cycle": "60%", "No-Load Voltage": "67V", "Inverter Frequency": "28 KHz", "Protection Class": "IP21S", "Insulation Class": "F", "Cooling": "Water", "Cable Length": "5m", "Pulse Type": "Digital Pulse", "Dimensions": "485 × 245 × 420 mm", "Net Weight": "16.5 kg" }, features: ["Digital pulse control, higher precision", "Independent pulse control (frequency/duty/base)", "Imported IGBT power modules", "HF arc ignition, 99%+ success rate", "Precise heat input for thin plate welding"] },
      { name: "Digital Pulse Water 10m Kit", image: "/products/wsm-400-pulse.jpg", price: 975, specs: { "Model": "WSM-400 (Digital Pulse)", "Input Power": "3P 380V ±15%", "Frequency": "50/60 Hz", "Current Range": "10–400 A", "Pulse Frequency": "0.5–500 Hz", "Duty Cycle": "10%–90%", "Rated Duty Cycle": "60%", "No-Load Voltage": "67V", "Inverter Frequency": "28 KHz", "Protection Class": "IP21S", "Insulation Class": "F", "Cooling": "Water", "Cable Length": "10m", "Pulse Type": "Digital Pulse", "Dimensions": "485 × 245 × 420 mm", "Net Weight": "16.5 kg" }, features: ["Digital pulse control, higher precision", "Independent pulse control (frequency/duty/base)", "Imported IGBT power modules", "HF arc ignition, 99%+ success rate", "Precise heat input for thin plate welding"] },
      { name: "Digital Pulse Water 15m Kit", image: "/products/wsm-400-pulse.jpg", price: 980, specs: { "Model": "WSM-400 (Digital Pulse)", "Input Power": "3P 380V ±15%", "Frequency": "50/60 Hz", "Current Range": "10–400 A", "Pulse Frequency": "0.5–500 Hz", "Duty Cycle": "10%–90%", "Rated Duty Cycle": "60%", "No-Load Voltage": "67V", "Inverter Frequency": "28 KHz", "Protection Class": "IP21S", "Insulation Class": "F", "Cooling": "Water", "Cable Length": "15m", "Pulse Type": "Digital Pulse", "Dimensions": "485 × 245 × 420 mm", "Net Weight": "16.5 kg" }, features: ["Digital pulse control, higher precision", "Independent pulse control (frequency/duty/base)", "Imported IGBT power modules", "HF arc ignition, 99%+ success rate", "Precise heat input for thin plate welding"] },
      { name: "Digital Pulse Air 5m Kit", image: "/products/wsm-400-pulse.jpg", price: 1200, specs: { "Model": "WSM-400 (Digital Pulse)", "Input Power": "3P 380V ±15%", "Frequency": "50/60 Hz", "Current Range": "10–400 A", "Pulse Frequency": "0.5–500 Hz", "Duty Cycle": "10%–90%", "Rated Duty Cycle": "60%", "No-Load Voltage": "67V", "Inverter Frequency": "28 KHz", "Protection Class": "IP21S", "Insulation Class": "F", "Cooling": "Air", "Cable Length": "5m", "Pulse Type": "Digital Pulse", "Dimensions": "485 × 245 × 420 mm", "Net Weight": "16.5 kg" }, features: ["Digital pulse control, higher precision", "Independent pulse control (frequency/duty/base)", "Imported IGBT power modules", "HF arc ignition, 99%+ success rate", "Precise heat input for thin plate welding"] },
      { name: "Digital Pulse Air 10m Kit", image: "/products/wsm-400-pulse.jpg", price: 1220, specs: { "Model": "WSM-400 (Digital Pulse)", "Input Power": "3P 380V ±15%", "Frequency": "50/60 Hz", "Current Range": "10–400 A", "Pulse Frequency": "0.5–500 Hz", "Duty Cycle": "10%–90%", "Rated Duty Cycle": "60%", "No-Load Voltage": "67V", "Inverter Frequency": "28 KHz", "Protection Class": "IP21S", "Insulation Class": "F", "Cooling": "Air", "Cable Length": "10m", "Pulse Type": "Digital Pulse", "Dimensions": "485 × 245 × 420 mm", "Net Weight": "16.5 kg" }, features: ["Digital pulse control, higher precision", "Independent pulse control (frequency/duty/base)", "Imported IGBT power modules", "HF arc ignition, 99%+ success rate", "Precise heat input for thin plate welding"] },
      { name: "Digital Pulse Air 15m Kit", image: "/products/wsm-400-pulse.jpg", price: 1240, specs: { "Model": "WSM-400 (Digital Pulse)", "Input Power": "3P 380V ±15%", "Frequency": "50/60 Hz", "Current Range": "10–400 A", "Pulse Frequency": "0.5–500 Hz", "Duty Cycle": "10%–90%", "Rated Duty Cycle": "60%", "No-Load Voltage": "67V", "Inverter Frequency": "28 KHz", "Protection Class": "IP21S", "Insulation Class": "F", "Cooling": "Air", "Cable Length": "15m", "Pulse Type": "Digital Pulse", "Dimensions": "485 × 245 × 420 mm", "Net Weight": "16.5 kg" }, features: ["Digital pulse control, higher precision", "Independent pulse control (frequency/duty/base)", "Imported IGBT power modules", "HF arc ignition, 99%+ success rate", "Precise heat input for thin plate welding"] },
    ],
  },
  // ===== 3. MIG/MAG Welder NBM-500 =====
  {
    slug: "nbm-500",
    name: "MIG/MAG Welder NBM-500",
    image: "/products/nbm-500.png",
    desc: "Heavy-duty industrial MIG/MAG welder with 100% duty cycle at 500A. Pulse MIG for aluminum, synergic control for steel. Built for shipyards, steel structures, and 24/7 production environments.",
    tags: ["MIG/MAG", "Industrial", "Heavy Duty", "Aluminum", "Shipyard"],
    fullDesc: [
      "The NBM-500 is a true industrial workhorse — full-bridge IGBT inverter with 100% duty cycle at 500A (40°C ambient), designed for non-stop production in shipyards, steel structure fabrication, and heavy machinery manufacturing.",
      "Five welding modes in one machine: Pulse MIG for aluminum (5083/6061), Synergic MIG for carbon steel, Standard MIG/MAG, MMA stick, and Lift TIG. Supports 1.0mm, 1.2mm, and 1.6mm wire diameters with a separate 4-roller enclosed wire feeder. IP23 rated with Class H insulation for the toughest environments. EU CE certified.",
    ],
    variants: [
      {
        name: "NBM-500 5m Cable",
        image: "/products/nbm-500.png",
        price: 2650,
        specs: {
          "Model": "NBM-500",
          "Input Power": "3P 380V ±15%",
          "Frequency": "50/60 Hz",
          "Rated Input Capacity": "32 KVA",
          "Current Range": "40–500 A",
          "Rated Duty Cycle": "100% @ 500A / 40°C",
          "Wire Diameter": "1.0 / 1.2 / 1.6 mm",
          "Welding Modes": "Pulse MIG / Synergic MIG / Standard MIG / MMA / Lift TIG",
          "Weldable Materials": "Carbon Steel / Stainless / 5083 Al / 6061 Al",
          "Wire Feeder": "Separate 4-roller enclosed feeder",
          "Cooling": "Smart Forced Air",
          "Cable Length": "5m",
          "Protection Class": "IP23",
          "Insulation Class": "H",
          "Net Weight": "~55 kg",
        },
        features: ["100% duty cycle @ 500A for 24/7 operation", "Pulse MIG aluminum welding (5083/6061)", "5 welding modes in one machine", "Shipyard-grade heavy industrial design"],
      },
      {
        name: "NBM-500 10m Cable",
        image: "/products/nbm-500.png",
        price: 2800,
        specs: {
          "Model": "NBM-500",
          "Input Power": "3P 380V ±15%",
          "Frequency": "50/60 Hz",
          "Rated Input Capacity": "32 KVA",
          "Current Range": "40–500 A",
          "Rated Duty Cycle": "100% @ 500A / 40°C",
          "Wire Diameter": "1.0 / 1.2 / 1.6 mm",
          "Welding Modes": "Pulse MIG / Synergic MIG / Standard MIG / MMA / Lift TIG",
          "Weldable Materials": "Carbon Steel / Stainless / 5083 Al / 6061 Al",
          "Wire Feeder": "Separate 4-roller enclosed feeder",
          "Cooling": "Smart Forced Air",
          "Cable Length": "10m",
          "Protection Class": "IP23",
          "Insulation Class": "H",
          "Net Weight": "~55 kg",
        },
        features: ["100% duty cycle @ 500A for 24/7 operation", "Pulse MIG aluminum welding (5083/6061)", "5 welding modes in one machine", "Shipyard-grade heavy industrial design"],
      },
      {
        name: "NBM-500 15m Cable",
        image: "/products/nbm-500.png",
        price: 2950,
        specs: {
          "Model": "NBM-500",
          "Input Power": "3P 380V ±15%",
          "Frequency": "50/60 Hz",
          "Rated Input Capacity": "32 KVA",
          "Current Range": "40–500 A",
          "Rated Duty Cycle": "100% @ 500A / 40°C",
          "Wire Diameter": "1.0 / 1.2 / 1.6 mm",
          "Welding Modes": "Pulse MIG / Synergic MIG / Standard MIG / MMA / Lift TIG",
          "Weldable Materials": "Carbon Steel / Stainless / 5083 Al / 6061 Al",
          "Wire Feeder": "Separate 4-roller enclosed feeder",
          "Cooling": "Smart Forced Air",
          "Cable Length": "15m",
          "Protection Class": "IP23",
          "Insulation Class": "H",
          "Net Weight": "~55 kg",
        },
        features: ["100% duty cycle @ 500A for 24/7 operation", "Pulse MIG aluminum welding (5083/6061)", "5 welding modes in one machine", "Shipyard-grade heavy industrial design"],
      },
      {
        name: "NBM-500 20m Cable",
        image: "/products/nbm-500.png",
        price: 3100,
        specs: {
          "Model": "NBM-500",
          "Input Power": "3P 380V ±15%",
          "Frequency": "50/60 Hz",
          "Rated Input Capacity": "32 KVA",
          "Current Range": "40–500 A",
          "Rated Duty Cycle": "100% @ 500A / 40°C",
          "Wire Diameter": "1.0 / 1.2 / 1.6 mm",
          "Welding Modes": "Pulse MIG / Synergic MIG / Standard MIG / MMA / Lift TIG",
          "Weldable Materials": "Carbon Steel / Stainless / 5083 Al / 6061 Al",
          "Wire Feeder": "Separate 4-roller enclosed feeder",
          "Cooling": "Smart Forced Air",
          "Cable Length": "20m",
          "Protection Class": "IP23",
          "Insulation Class": "H",
          "Net Weight": "~55 kg",
        },
        features: ["100% duty cycle @ 500A for 24/7 operation", "Pulse MIG aluminum welding (5083/6061)", "5 welding modes in one machine", "Shipyard-grade heavy industrial design"],
      },
    ],
  },
  // ===== 4. ARC Welder ZX7-400 =====
  {
    slug: "zx7-400",
    name: "ARC Welder ZX7-400",
    image: "/products/zx7-400.jpg",
    desc: "Compact portable ARC welder with IGBT inverter technology. Dual voltage auto-detection, generator-compatible for remote job sites. Supports acid, basic, and cellulose electrodes up to 4.0mm.",
    tags: ["MMA/ARC", "Portable", "Dual Voltage", "Field Welding", "Construction"],
    fullDesc: [
      "The ZX7-400 packs serious welding power into a portable IGBT inverter package — just 25kg yet capable of running 4.0mm electrodes. Dual voltage auto-detection (220V/380V) means you can plug into site power or a generator without reconfiguration.",
      "Smart arc features include anti-stick, adjustable arc force, and hot start for smooth ignition with difficult electrodes (E6010, E7018). Wide voltage tolerance makes it ideal for construction sites, field repairs, pipeline work, and remote locations where power quality is unreliable. EU CE certified.",
    ],
    variants: [
      { name: "ZX7-400 Torch 4m + Ground 2m", image: "/products/zx7-400.jpg", price: 200, specs: { "Model": "ZX7-400", "Input Power": "3P 380V ±15%", "Frequency": "50/60 Hz", "Rated Input Capacity": "18.2 KVA", "Rated Input Current": "27.6 A", "Current Range": "40–400 A", "Rated Output Voltage": "36 V", "No-Load Voltage": "67.5 V", "Rated Duty Cycle": "60%", "Electrode Diameter": "Φ1.6–4.0 mm", "Torch Cable": "4m", "Ground Cable": "2m", "Protection Class": "IP21S", "Insulation Class": "F", "Dimensions": "633 × 368 × 578 mm", "Net Weight": "25 kg" }, features: ["Portable design, easy to carry", "220V/380V dual voltage auto-detection", "Anti-stick, arc force & hot start", "Generator compatible for field operations"] },
      { name: "ZX7-400 Torch 7m + Ground 3m", image: "/products/zx7-400.jpg", price: 225, specs: { "Model": "ZX7-400", "Input Power": "3P 380V ±15%", "Frequency": "50/60 Hz", "Rated Input Capacity": "18.2 KVA", "Rated Input Current": "27.6 A", "Current Range": "40–400 A", "Rated Output Voltage": "36 V", "No-Load Voltage": "67.5 V", "Rated Duty Cycle": "60%", "Electrode Diameter": "Φ1.6–4.0 mm", "Torch Cable": "7m", "Ground Cable": "3m", "Protection Class": "IP21S", "Insulation Class": "F", "Dimensions": "633 × 368 × 578 mm", "Net Weight": "25 kg" }, features: ["Portable design, easy to carry", "220V/380V dual voltage auto-detection", "Anti-stick, arc force & hot start", "Generator compatible for field operations"] },
      { name: "ZX7-400 Torch 10m + Ground 5m", image: "/products/zx7-400.jpg", price: 250, specs: { "Model": "ZX7-400", "Input Power": "3P 380V ±15%", "Frequency": "50/60 Hz", "Rated Input Capacity": "18.2 KVA", "Rated Input Current": "27.6 A", "Current Range": "40–400 A", "Rated Output Voltage": "36 V", "No-Load Voltage": "67.5 V", "Rated Duty Cycle": "60%", "Electrode Diameter": "Φ1.6–4.0 mm", "Torch Cable": "10m", "Ground Cable": "5m", "Protection Class": "IP21S", "Insulation Class": "F", "Dimensions": "633 × 368 × 578 mm", "Net Weight": "25 kg" }, features: ["Portable design, easy to carry", "220V/380V dual voltage auto-detection", "Anti-stick, arc force & hot start", "Generator compatible for field operations"] },
    ],
  },
  // ===== 5. Plasma Cutter LGK-100 =====
  {
    slug: "lgk-100",
    name: "Plasma Cutter LGK-100",
    image: "/products/lgk-100.jpg",
    desc: "High-speed IGBT plasma cutter with non-contact HF pilot arc. Clean cuts through carbon steel up to 30mm, stainless steel, aluminum, and copper. Supports both handheld and CNC table operation.",
    tags: ["Plasma Cutter", "CNC Compatible", "High Speed", "Industrial Cutting", "Multi-Metal"],
    fullDesc: [
      "The LGK-100 plasma cutter delivers industrial-grade cutting performance through IGBT inverter technology with non-contact HF pilot arc ignition. Clean quality cuts through 25mm carbon steel, with max severance at 30mm. Also handles stainless steel, aluminum, copper, and titanium alloy.",
      "Designed for both handheld use and CNC table integration. Features automatic gas-electric integrated torch, 2T/4T trigger modes, gas detection, and adjustable post-flow cooling. Full protection suite: overheat, overcurrent, phase loss, and voltage fluctuation safeguards. EU CE certified.",
    ],
    variants: [
      { name: "LGK-100 10m Torch Kit", image: "/products/lgk-100.jpg", price: 1000, specs: { "Model": "LGK-100", "Input Power": "3P 380V ±15%", "Frequency": "50/60 Hz", "Rated Input Capacity": "15 KVA", "Current Range": "30–100 A", "No-Load Voltage": "310 V", "Rated Duty Cycle": "40% @ 80A", "Power Factor": "0.73", "Efficiency": "85%", "Quality Cut": "Carbon Steel 25 mm", "Max Cut": "Carbon Steel 30 mm", "Arc Ignition": "Non-contact HF Pilot Arc", "Torch Kit": "10m", "Protection Class": "IP21", "Insulation Class": "F", "Dimensions": "430 × 330 × 165 mm", "Net Weight": "22 kg" }, features: ["HF arc ignition, fast cutting speed", "Clean cuts, no secondary grinding", "Grid cutting + arc-break protection", "Cuts stainless steel, aluminum, copper & more"] },
      { name: "LGK-100 15m Torch Kit", image: "/products/lgk-100.jpg", price: 1020, specs: { "Model": "LGK-100", "Input Power": "3P 380V ±15%", "Frequency": "50/60 Hz", "Rated Input Capacity": "15 KVA", "Current Range": "30–100 A", "No-Load Voltage": "310 V", "Rated Duty Cycle": "40% @ 80A", "Power Factor": "0.73", "Efficiency": "85%", "Quality Cut": "Carbon Steel 25 mm", "Max Cut": "Carbon Steel 30 mm", "Arc Ignition": "Non-contact HF Pilot Arc", "Torch Kit": "15m", "Protection Class": "IP21", "Insulation Class": "F", "Dimensions": "430 × 330 × 165 mm", "Net Weight": "22 kg" }, features: ["HF arc ignition, fast cutting speed", "Clean cuts, no secondary grinding", "Grid cutting + arc-break protection", "Cuts stainless steel, aluminum, copper & more"] },
    ],
  },
  // ===== 6. More Models =====
  {
    slug: "dhj-630",
    name: "More Models",
    image: "/products/dhj-630.webp",
    desc: "We offer a full range of welding equipment covering TIG, MIG/MAG, MMA, and plasma cutting. More models available — contact us for details.",
    tags: ["More Models", "Custom", "Inquiry"],
    fullDesc: [
      "In addition to the standard models shown above, we offer a wider selection of welding equipment with different power ratings and feature configurations.",
      "Whether you need special voltage, specialized material welding, or automated welding solutions, contact our team for more model information and professional selection advice.",
    ],
    variants: [
      {
        name: "Contact Us for More Models",
        image: "/products/dhj-630.webp",
        specs: {
          "Note": "Contact us for full model specifications",
        },
        features: ["Full range of welding machines available", "Non-standard customization supported", "Professional model selection advice", "Contact us for complete product catalog"],
      },
    ],
  },
];

export function getProductBySlugEn(slug: string): ProductEn | undefined {
  return productsEn.find((p) => p.slug === slug);
}
