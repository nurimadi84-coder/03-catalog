/**
 * Evidence script for Idea #2 quiz funnel checklist.
 * Mirrors src/utils/calculator.ts formula from ТЗ.
 */

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

function calculateBedCost(state) {
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
  let retailMultiplier = 1.85;
  if (state.urgency === "fast") retailMultiplier += 0.1;
  if (state.urgency === "express") retailMultiplier += 0.25;
  return {
    totalMaterials,
    estimatedRetailPrice: Math.round(totalMaterials * retailMultiplier),
  };
}

const TOTAL_STEPS = 4;
console.log("=== PROGRESS MAP ===");
for (let step = 1; step <= TOTAL_STEPS; step++) {
  console.log(`Step ${step}/${TOTAL_STEPS} => ${Math.round((step / TOTAL_STEPS) * 100)}%`);
}

console.log("\n=== DYNAMIC RECALC (live price on option change) ===");
const baseState = {
  size: "160x200",
  fabric: "standard",
  headboard: "standard_100",
  hasLiftingMechanism: true,
  hasMattress: true,
  urgency: "standard",
};
const clicks = [
  ["select size 160", { ...baseState }],
  ["fabric -> premium", { ...baseState, fabric: "premium" }],
  ["headboard -> high_130", { ...baseState, fabric: "premium", headboard: "high_130" }],
  ["urgency -> express", { ...baseState, fabric: "premium", headboard: "high_130", urgency: "express" }],
  ["exclude mattress", { ...baseState, fabric: "premium", headboard: "high_130", urgency: "express", hasMattress: false }],
];

let prev = null;
for (const [label, state] of clicks) {
  const r = calculateBedCost(state);
  const delta = prev === null ? 0 : r.estimatedRetailPrice - prev;
  console.log(
    `${label.padEnd(28)} retail=${String(r.estimatedRetailPrice).padStart(7)}  materials=${String(r.totalMaterials).padStart(7)}  delta=${delta >= 0 ? "+" : ""}${delta}`
  );
  prev = r.estimatedRetailPrice;
}

console.log("\n=== BASE CASES ===");
const cases = [
  ["90 all-in", { size: "90x200", fabric: "standard", headboard: "standard_100", hasLiftingMechanism: true, hasMattress: true, urgency: "standard" }, 70550],
  ["160 all-in", { size: "160x200", fabric: "standard", headboard: "standard_100", hasLiftingMechanism: true, hasMattress: true, urgency: "standard" }, 96800],
  ["180 all-in", { size: "180x200", fabric: "standard", headboard: "standard_100", hasLiftingMechanism: true, hasMattress: true, urgency: "standard" }, 113000],
];
let fails = 0;
for (const [name, state, expectMat] of cases) {
  const r = calculateBedCost(state);
  const ok = r.totalMaterials === expectMat;
  if (!ok) fails += 1;
  console.log(`${ok ? "PASS" : "FAIL"} ${name}: materials=${r.totalMaterials} retail=${r.estimatedRetailPrice}`);
}
console.log(`TOTAL_FAILS ${fails}`);
process.exit(fails === 0 ? 0 : 1);
