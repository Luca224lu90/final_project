export default function HomePage() {
  return (
    <section className="card stack">
      <h2>Willkommen zum Schulabenteuer 🎓</h2>
      <p>
        Forme deinen Charakter mit deinen Entscheidungen, entdecke deine
        Fähigkeiten und erhalte am Ende der 10. Woche die für dich am besten
        passende Unterrichtsempfehlung.
      </p>
      <div className="row">
        <a href="/character">
          <button>Charakter Erstellen</button>
        </a>
        <a href="/game">
          <button className="secondary">Spiel Fortsetzen</button>
        </a>
        <a href="/status">
          <button className="ghost">Status Anzeigen</button>
        </a>
      </div>
    </section>
  );
}
