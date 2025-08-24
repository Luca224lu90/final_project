"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ensureCharacter, loadCharacter, saveCharacter } from "../lib/storage";
import {
  applyEffects,
  bestKey,
  clampStat,
  roll,
  runRequirement,
} from "../lib/engine";
import eventsData from "../data/events.json";

// Kleine Helfer:
function avg(o) {
  const v = Object.values(o);
  return v.reduce((a, b) => a + b, 0) / v.length;
}
function clamp01(n) {
  return Math.max(0, Math.min(10, n));
}

export default function GamePage() {
  const router = useRouter();
  const [ch, setCh] = useState(null);
  const [idx, setIdx] = useState(() =>
    Math.floor(Math.random() * eventsData.length)
  );
  const [resultNote, setResultNote] = useState(null); // zum Anzeigen des Testergebnisses/Nachricht

  const current = useMemo(() => eventsData[idx], [idx]);

  // Charakter laden
  useEffect(() => {
    const c = loadCharacter() || ensureCharacter();
    setCh(c);
  }, []);

  // Nachricht löschen, wenn Ereignis wechselt
  useEffect(() => {
    setResultNote(null);
  }, [idx]);

  // Nach Woche 10 zum Finale weiterleiten
  useEffect(() => {
    if (!ch) return;
    if ((ch.week ?? 1) > 10) router.push("/final");
  }, [ch, router]);

  if (!ch) return <div className="card">Wird geladen...</div>;

  function nextEvent() {
    setIdx(Math.floor(Math.random() * eventsData.length));
  }

  function onChoice(choice) {
    let updated = { ...ch };

    if (choice.requires) {
      const res = runRequirement(ch, choice.requires);
      const passed = res.passed;

      setResultNote({
        passed,
        details: res.details,
        text: passed
          ? choice.successText || "Erfolgreich!"
          : choice.failText || "Fehlgeschlagen.",
      });

      updated = applyEffects(
        updated,
        passed ? choice.successEffects : choice.failEffects
      );
    } else {
      updated = applyEffects(updated, choice.effects);
    }

    // Fortschritt der Woche sichern (+1 falls nicht im Effekt enthalten)
    if (
      !choice.effects?.week &&
      !choice.successEffects?.week &&
      !choice.failEffects?.week
    ) {
      updated.week = (updated.week ?? 1) + 1;
    }

    // Grundwerte begrenzen
    updated.motivation = clamp01(updated.motivation ?? 0);
    updated.stress = clamp01(updated.stress ?? 0);

    saveCharacter(updated);
    setCh(updated);

    if ((updated.week ?? 1) > 10) {
      router.push("/final");
    } else {
      setTimeout(() => nextEvent(), 400); // mit kurzer Verzögerung zum nächsten Ereignis
    }
  }

  // Stärkstes Fach
  const topSubject = bestKey(ch.stats);

  return (
    <section className="stack">
      <div className="kpi">
        <div className="card">
          <div className="val">{ch.week}/10</div>
          <div className="lbl">Woche</div>
        </div>
        <div className="card">
          <div className="val">{ch.motivation}</div>
          <div className="lbl">Motivation</div>
        </div>
        <div className="card">
          <div className="val">{ch.stress}</div>
          <div className="lbl">Stress</div>
        </div>
        <div className="card">
          <div className="val">{avg(ch.stats).toFixed(1)}</div>
          <div className="lbl">Gesamtdurchschnitt</div>
        </div>
        <div className="card">
          <div className="val">{topSubject}</div>
          <div className="lbl">Stärkster Bereich</div>
        </div>
      </div>

      <div className="card stack">
        <h2>{current.title}</h2>
        <p>{current.desc}</p>

        <div className="grid-2" style={{ marginTop: ".8rem" }}>
          {current.choices.map((c) => (
            <button key={c.id} onClick={() => onChoice(c)}>
              {c.label}
            </button>
          ))}
        </div>

        {resultNote && (
          <div className="card" style={{ marginTop: ".8rem" }}>
            <strong>
              {resultNote.passed ? "✅ Erfolgreich" : "❌ Fehlgeschlagen"}
            </strong>
            <p style={{ marginTop: ".4rem" }}>{resultNote.text}</p>
            <ul style={{ marginTop: ".4rem" }}>
              {resultNote.details.map((d, i) => (
                <li key={i}>
                  {d.type === "stat"
                    ? `Statusprüfung: ${d.key} = ${d.value} → Ziel ${
                        d.target
                      } → ${d.ok ? "Bestanden" : "Nicht bestanden"}`
                    : `Wurf (${d.dice}) = ${d.value} → Ziel ${d.target} → ${
                        d.ok ? "Bestanden" : "Nicht bestanden"
                      }`}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="row" style={{ marginTop: ".8rem" }}>
          <a href="/status">
            <button className="secondary">Status anzeigen</button>
          </a>
          <a href="/final">
            <button className="ghost">Zum Finale gehen</button>
          </a>
        </div>
      </div>
    </section>
  );
}
