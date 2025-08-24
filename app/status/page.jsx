"use client";

import { useEffect, useState } from "react";
import { loadCharacter, ensureCharacter } from "../lib/storage";

export default function StatusPage() {
  const [ch, setCh] = useState(null);

  useEffect(() => {
    setCh(loadCharacter() || ensureCharacter());
  }, []);

  if (!ch) return <div className="card">Lädt...</div>;

  return (
    <section className="stack">
      <div className="card">
        <h2>Charakterstatus</h2>
        <p>
          <strong>Name:</strong> {ch.name || "Schüler"}
        </p>
      </div>

      <div className="kpi">
        <Stat label="Mathematik" value={ch.stats.math} />
        <Stat label="Sprache" value={ch.stats.language} />
        <Stat label="Naturwissenschaft" value={ch.stats.science} />
        <Stat label="Kreativität" value={ch.stats.creativity} />
        <Stat label="Sozial" value={ch.stats.social} />
      </div>

      <div className="kpi">
        <Stat label="Motivation" value={ch.motivation} />
        <Stat label="Stress" value={ch.stress} />
        <Stat label="Woche" value={`${ch.week}/10`} />
      </div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="card">
      <div className="val">{value}</div>
      <div className="lbl">{label}</div>
    </div>
  );
}
