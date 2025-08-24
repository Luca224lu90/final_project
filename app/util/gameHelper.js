export function bestKey(stats) {
  const entries = Object.entries(stats).sort((a, b) => b[1] - a[1]);
  const map = {
    math: "Mathematik",
    language: "Sprache",
    nature: "Naturwissenschaft",
    creativity: "Kreativität",
    social: "Sozial",
  };
  return map[entries[0][0]] || "Unbekannt";
}
