/** Edge-case suite for quiz calculator report. */
const baseCosts = {
  "90x200": {
    dsp: 13500, fabric: 6000, foam: 4900, baseAndMattress: 25000,
    liftingMechanism: 7500, technicalMaterials: 9650, hardware: 4000,
  },
  "160x200": {
    dsp: 18000, fabric: 8000, foam: 8800, baseAndMattress: 36000,
    liftingMechanism: 8500, technicalMaterials: 12500, hardware: 5000,
  },
  "180x200": {
    dsp: 21000, fabric: 10000, foam: 10500, baseAndMattress: 42000,
    liftingMechanism: 9500, technicalMaterials: 14000, hardware: 6000,
  },
};

function calculate(state) {
  const base = baseCosts[state.size];
  let fabricCost = base.fabric;
  let baseAndMattressCost = base.baseAndMattress;
  let liftingCost = base.liftingMechanism;
  if (state.fabric === "premium") fabricCost *= 1.8;
  if (state.fabric === "luxury") fabricCost *= 2.6;
  let dspCost = base.dsp;
  if (state.headboard === "high_130") {
    dspCost *= 1.25;
    fabricCost *= 1.15;
  } else if (state.headboard === "max_150") {
    dspCost *= 1.5;
    fabricCost *= 1.3;
  }
  if (!state.hasMattress) {
    baseAndMattressCost = state.size === "90x200" ? 14000 : 20000;
  }
  if (!state.hasLiftingMechanism) liftingCost = 0;
  const totalMaterials = Math.round(
    dspCost + fabricCost + base.foam + baseAndMattressCost + liftingCost +
      base.technicalMaterials + base.hardware
  );
  let m = 1.85;
  if (state.urgency === "fast") m += 0.1;
  if (state.urgency === "express") m += 0.25;
  return {
    dsp: Math.round(dspCost),
    fabric: Math.round(fabricCost),
    foam: base.foam,
    baseAndMattress: Math.round(baseAndMattressCost),
    liftingMechanism: liftingCost,
    technicalMaterials: base.technicalMaterials,
    hardware: base.hardware,
    totalMaterials,
    estimatedRetailPrice: Math.round(totalMaterials * m),
    multiplier: m,
  };
}

function expect(name, state, checks) {
  const got = calculate(state);
  const fails = [];
  for (const [k, v] of Object.entries(checks)) {
    const actual = k === "multiplier" ? Number(got[k].toFixed(2)) : got[k];
    const expected = k === "multiplier" ? Number(Number(v).toFixed(2)) : v;
    if (actual !== expected) fails.push(`${k}: expected ${expected}, got ${actual}`);
  }
  const ok = fails.length === 0;
  console.log(JSON.stringify({
    name,
    ok,
    state,
    result: {
      totalMaterials: got.totalMaterials,
      estimatedRetailPrice: got.estimatedRetailPrice,
      multiplier: got.multiplier,
      dsp: got.dsp,
      fabric: got.fabric,
      baseAndMattress: got.baseAndMattress,
      liftingMechanism: got.liftingMechanism,
    },
    fails,
  }));
  return ok ? 0 : 1;
}

let fails = 0;

// Baseline sizes
fails += expect("EDGE min size 90 all-in", {
  size: "90x200", fabric: "standard", headboard: "standard_100",
  hasLiftingMechanism: true, hasMattress: true, urgency: "standard",
}, { totalMaterials: 70550, estimatedRetailPrice: Math.round(70550 * 1.85) });

fails += expect("EDGE mid size 160 all-in", {
  size: "160x200", fabric: "standard", headboard: "standard_100",
  hasLiftingMechanism: true, hasMattress: true, urgency: "standard",
}, { totalMaterials: 96800, estimatedRetailPrice: Math.round(96800 * 1.85) });

fails += expect("EDGE max size 180 all-in", {
  size: "180x200", fabric: "standard", headboard: "standard_100",
  hasLiftingMechanism: true, hasMattress: true, urgency: "standard",
}, { totalMaterials: 113000, estimatedRetailPrice: Math.round(113000 * 1.85) });

// Fabric extremes
fails += expect("EDGE fabric premium ×1.8 on 160", {
  size: "160x200", fabric: "premium", headboard: "standard_100",
  hasLiftingMechanism: true, hasMattress: true, urgency: "standard",
}, { fabric: 14400, totalMaterials: 103200, estimatedRetailPrice: Math.round(103200 * 1.85) });

fails += expect("EDGE fabric luxury ×2.6 on 90", {
  size: "90x200", fabric: "luxury", headboard: "standard_100",
  hasLiftingMechanism: true, hasMattress: true, urgency: "standard",
}, { fabric: 15600, totalMaterials: 80150, estimatedRetailPrice: Math.round(80150 * 1.85) });

// Headboard extremes
fails += expect("EDGE headboard high_130 on 160", {
  size: "160x200", fabric: "standard", headboard: "high_130",
  hasLiftingMechanism: true, hasMattress: true, urgency: "standard",
}, {
  dsp: Math.round(18000 * 1.25),
  fabric: Math.round(8000 * 1.15),
  totalMaterials: Math.round(18000 * 1.25 + 8000 * 1.15 + 8800 + 36000 + 8500 + 12500 + 5000),
});

fails += expect("EDGE headboard max_150 + luxury on 180", {
  size: "180x200", fabric: "luxury", headboard: "max_150",
  hasLiftingMechanism: true, hasMattress: true, urgency: "standard",
}, {
  dsp: 31500,
  fabric: Math.round(10000 * 2.6 * 1.3),
  totalMaterials: Math.round(21000 * 1.5 + 10000 * 2.6 * 1.3 + 10500 + 42000 + 9500 + 14000 + 6000),
  estimatedRetailPrice: Math.round(
    Math.round(21000 * 1.5 + 10000 * 2.6 * 1.3 + 10500 + 42000 + 9500 + 14000 + 6000) * 1.85
  ),
});

// Options off
fails += expect("EDGE no mattress 90 (base=14000)", {
  size: "90x200", fabric: "standard", headboard: "standard_100",
  hasLiftingMechanism: true, hasMattress: false, urgency: "standard",
}, { baseAndMattress: 14000, totalMaterials: 59550 });

fails += expect("EDGE no mattress 160 (base=20000)", {
  size: "160x200", fabric: "standard", headboard: "standard_100",
  hasLiftingMechanism: true, hasMattress: false, urgency: "standard",
}, { baseAndMattress: 20000, totalMaterials: 80800 });

fails += expect("EDGE no lifting mechanism", {
  size: "180x200", fabric: "standard", headboard: "standard_100",
  hasLiftingMechanism: false, hasMattress: true, urgency: "standard",
}, { liftingMechanism: 0, totalMaterials: 103500 });

fails += expect("EDGE no lift + no mattress (min config 90)", {
  size: "90x200", fabric: "standard", headboard: "standard_100",
  hasLiftingMechanism: false, hasMattress: false, urgency: "standard",
}, { liftingMechanism: 0, baseAndMattress: 14000, totalMaterials: 52050 });

// Urgency extremes
fails += expect("EDGE urgency fast ×1.95", {
  size: "160x200", fabric: "standard", headboard: "standard_100",
  hasLiftingMechanism: true, hasMattress: true, urgency: "fast",
}, { estimatedRetailPrice: Math.round(96800 * 1.95), multiplier: 1.95 });

fails += expect("EDGE urgency express ×2.10", {
  size: "160x200", fabric: "standard", headboard: "standard_100",
  hasLiftingMechanism: true, hasMattress: true, urgency: "express",
}, { estimatedRetailPrice: Math.round(96800 * 2.1), multiplier: 2.1 });

// Kitchen sink max
fails += expect("EDGE max combo 180 luxury max_150 express", {
  size: "180x200", fabric: "luxury", headboard: "max_150",
  hasLiftingMechanism: true, hasMattress: true, urgency: "express",
}, {
  totalMaterials: 147300,
  estimatedRetailPrice: Math.round(147300 * 2.1),
  multiplier: 2.1,
});

// Kitchen sink min-ish with premium modifiers still
fails += expect("EDGE combo no-lift/no-matt/premium/high/express 160", {
  size: "160x200", fabric: "premium", headboard: "high_130",
  hasLiftingMechanism: false, hasMattress: false, urgency: "express",
}, {
  // dsp 18000*1.25=22500; fabric 8000*1.8*1.15=16560; foam 8800; base 20000; lift 0; tech 12500; hw 5000
  // = 22500+16560+8800+20000+0+12500+5000 = 85360
  totalMaterials: 85360,
  estimatedRetailPrice: Math.round(85360 * 2.1),
});

// Screenshot scenario (documented selection)
fails += expect("SCREENSHOT scenario 160 premium high_130 lift+matt express", {
  size: "160x200", fabric: "premium", headboard: "high_130",
  hasLiftingMechanism: true, hasMattress: true, urgency: "express",
}, {
  // dsp 22500; fabric 8000*1.8*1.15=16560; foam 8800; base 36000; lift 8500; tech 12500; hw 5000
  // = 22500+16560+8800+36000+8500+12500+5000 = 109860
  totalMaterials: 109860,
  estimatedRetailPrice: Math.round(109860 * 2.1),
});

console.error(`TOTAL_FAILS ${fails}`);
process.exit(fails === 0 ? 0 : 1);
