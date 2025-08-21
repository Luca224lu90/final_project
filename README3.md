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
