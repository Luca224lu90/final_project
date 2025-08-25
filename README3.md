final_project/
│
├── public/
│ ├── index.html # Einstiegspunkt für React
│ ├── favicon.ico
│ └── assets/ # Bilder, Icons, Sounds
│ ├── icons/
│ ├── images/
│ └── sounds/
│
├── src/
│ ├── components/ # UI-Bausteine (Person A)
│ │ ├── CharacterSheet.jsx # Charakterbogen-Anzeige
│ │ ├── EventCard.jsx # Ereignis-/Entscheidungskarten
│ │ ├── DiceRoller.jsx # Würfelanimation + Ergebnisanzeige
│ │ ├── ProgressTracker.jsx # Fortschrittsanzeige (z. B. Wochen)
│ │ └── ResultScreen.jsx # Endergebnis der Fächerwahl
│ │
│ ├── data/ # Statische Daten (Person B)
│ │ ├── events.json # Alle Spielereignisse + Optionen
│ │ ├── subjects.json # Mögliche Fächer + Kriterien
│ │ └── feedback.json # Feedbacktexte
│ │
│ ├── logic/ # Spiel-/Entscheidungslogik (Person B)
│ │ ├── gameState.js # Spielerwerte & Statusverwaltung
│ │ ├── eventHandler.js # Ereignisauswertung
│ │ ├── dice.js # Würfellogik (z. B. 1W6)
│ │ └── subjectRecommendation.js # Algorithmus für Fächerwahl
│ │
│ ├── pages/ # Ganze Screens (A+B)
│ │ ├── StartScreen.jsx # Startseite mit Buttons
│ │ ├── GameScreen.jsx # Hauptspielansicht
│ │ └── EndScreen.jsx # Abschluss & Auswertung
│ │
│ ├── styles/ # CSS/Tailwind Styles (Person A)
│ │ ├── globals.css
│ │ └── components.css
│ │
│ ├── utils/ # Hilfsfunktionen (A+B)
│ │ ├── storage.js # localStorage-Handling
│ │ ├── random.js # Zufallsfunktionen
│ │ └── format.js # Textformatierungen
│ │
│ ├── App.jsx # Hauptrouting + Seitenlogik
│ ├── index.js # React-Einstiegspunkt
│ └── router.js # Navigation zwischen Screens
│
├── package.json
├── README.md
└── .gitignore

Prioritetenliste der features: 0. Beispieluser erstellen

1. login/logout
2. charakterbögen
3. fragen erstellung der unterschiedlichen fächer
4. beantwortung der fragen.
5. fortschritte bei der beantwortung der fragen. (fortschrittsbogen zu allen schülern)
6. datenbank, wie sieht der fortschritt aus, datensatz.
7. Würfelanimationen

Typische Wahlpflichtfächer / Besonderheiten:
I – Mathematisch-naturwissenschaftlich-technisch Technik, Physik, Chemie verstärkte Mathematik, zusätzlich Technisches Zeichnen, mehr Physik/Chemie
II – Wirtschaftlich BWL, Rechnungswesen Betriebswirtschaftslehre, Rechnungswesen, Wirtschaftsgeografie
IIIa – Sprachlich Fremdsprachen Zweite Fremdsprache (z. B. Französisch) statt BwR/Technik
IIIb – Musisch-gestaltend Kunst, Musik, Werken Kunsterziehung, textiles Gestalten

Quellen:
https://directory.doabooks.org/browse?type=collection

Die Fächer:

1. Mathematik=M1, Physik=P1, Chemie=C1, Technisches Zeichnen=D1;
2. Betriebswirtschaftslehre=BWL2, Rechnungswesen=RW2, Wirtschfaftsgeografie=WG2;
3. a. eine Fremdsprache wie Spanisch=S3A, Französisch=F3A, oder Latein=L3A
4. b. Kunst=K3B, Musik=M3B, Werken=W3B, textiles Gestalten=G3B

Insgesamt zu jedem Fach 6 Fragen; (insgesamt 84 Fragen und Rätsel):
-M1abcdef, P1abcdef, C1abcdef, D1abcdef; (24 Fragen)
-BWL2abcdef, RW2abcdef, WG2abcdef; (18 Fragen)
-S3Aabcdef, F3Aabcdef, L3Aabcdef; (18 Fragen)
-K3Babcdef, M3Babcdef, W3Babcdef, G3Babcdef; (24 Fragen)
