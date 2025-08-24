// app/lib/engine.js
export function roll(dice = "1d6") {
  // Unterstützt Ausdrücke wie "2d6+1", "1d8", "1d6-2"
  const m = /^(\d+)d(\d+)([+-]\d+)?$/i.exec(dice.trim());
  if (!m) return 0;
  const [, cStr, sStr, modStr] = m;
  const count = parseInt(cStr, 10);
  const sides = parseInt(sStr, 10);
  const mod = modStr ? parseInt(modStr, 10) : 0;
  let sum = 0;
  for (let i = 0; i < count; i++) sum += Math.floor(Math.random() * sides) + 1;
  return sum + mod;
}

export function clampStat(n) {
  return Math.max(0, Math.min(10, n));
}

export function applyEffects(ch, effects = {}) {
  const next = { ...ch, stats: { ...ch.stats } };
  const { stats = {}, stress = 0, motivation = 0, week = 0 } = effects;

  for (const k of Object.keys(stats))
    next.stats[k] = clampStat((next.stats[k] ?? 0) + stats[k]);
  if (typeof stress === "number")
    next.stress = clampStat((next.stress ?? 0) + stress);
  if (typeof motivation === "number")
    next.motivation = clampStat((next.motivation ?? 0) + motivation);
  if (typeof week === "number" && week !== 0)
    next.week = (next.week ?? 1) + week;

  return next;
}

/**
 * Test-Schema (choice.requires):
 * {
 *   anyOf: [
 *     { stat: "language", gte: 5 },               // Stat ≥ 5
 *     { roll: "1d6", gte: 4 }                     // Würfel ≥ 4
 *   ]
 * }
 * Erfolgs-/Misserfolgs-Ergebnisse werden mit choice.successEffects / choice.failEffects angegeben.
 */
export function runRequirement(ch, requires) {
  if (!requires || !requires.anyOf?.length) {
    return { passed: true, details: [] };
  }
  const details = [];
  let passed = false;

  for (const cond of requires.anyOf) {
    if (cond.stat) {
      const val = ch.stats[cond.stat] ?? 0;
      const ok =
        (cond.gte != null && val >= cond.gte) ||
        (cond.lte != null && val <= cond.lte) ||
        (cond.gt != null && val > cond.gt) ||
        (cond.lt != null && val < cond.lt);
      details.push({
        type: "stat",
        key: cond.stat,
        value: val,
        ok,
        target: cond.gte ?? cond.lte ?? cond.gt ?? cond.lt,
      });
      if (ok) passed = true;
    } else if (cond.roll) {
      const r = roll(cond.roll);
      const ok =
        (cond.gte != null && r >= cond.gte) ||
        (cond.lte != null && r <= cond.lte) ||
        (cond.gt != null && r > cond.gt) ||
        (cond.lt != null && r < cond.lt);
      details.push({
        type: "roll",
        dice: cond.roll,
        value: r,
        ok,
        target: cond.gte ?? cond.lte ?? cond.gt ?? cond.lt,
      });
      if (ok) passed = true;
    }
  }
  return { passed, details };
}

// lib/engine.js

export function bestKey(stats) {
  const entries = Object.entries(stats).sort((a, b) => b[1] - a[1]);
  const map = {
    math: "Mathematik",
    language: "Sprache",
    nature: "Natur",
    creativity: "Kreativität",
    social: "Sozial",
  };
  return map[entries[0][0]] || entries[0][0];
}

// Andere bestehende Exports beibehalten
export { applyEffects, clampStat, roll, runRequirement };
