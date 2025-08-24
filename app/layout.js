import "../app/globals.css";

export const metadata = {
  title: "Wähle Deine Eigene Entscheidung",
  description: "Entscheidungsbasierte Schulabenteuer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        <header>
          <div className="header-inner">
            <h1>Wähle Deine Eigene Entscheidung</h1>
            <nav className="nav">
              <a href="/">Startseite</a>
              <a href="/character">Charakter</a>
              <a href="/game">Spiel</a>
              <a href="/status">Status</a>
              <a href="/final">Finale</a>
            </nav>
          </div>
        </header>
        <main className="stack">{children}</main>
        <footer>
          <div className="footer-inner">© 2025 Schulspiel-Projekt</div>
        </footer>
      </body>
    </html>
  );
}
