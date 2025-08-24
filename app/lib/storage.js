export const DEFAULT_CHARACTER = {
  name: "",
  stats: {
    math: 3,
    language: 3,
    science: 3,
    creativity: 3,
    social: 3,
  },
  stress: 2,
  motivation: 3,
  week: 1,
};

const KEY = "school-game:character";

export function loadCharacter() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveCharacter(ch) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(ch));
}

export function resetCharacter() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

export function ensureCharacter() {
  let ch = loadCharacter();
  if (!ch) {
    ch = structuredClone(DEFAULT_CHARACTER);
    saveCharacter(ch);
  }
  return ch;
}
