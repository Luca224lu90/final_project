🧾 1. Startbildschirm
Zweck: Einstieg ins Spiel, ggf. Name eingeben oder bestehenden Spielstand laden.

sql
Kopieren
Bearbeiten
+---------------------------------------+
| 🎒 Choose Your Own |
| Decision |
| |
| [▶️ Neues Spiel starten] |
| [💾 Spielstand laden] |
| |
| "Triff deine Entscheidungen im |
| Schulalltag – was passt zu dir?" |
+---------------------------------------+
🧍 2. Charakterbogen (UI/UX - Person A)
Zweck: Startwerte setzen (z. B. durch Fragen oder Zufallswürfel).

yaml
Kopieren
Bearbeiten
+------------------ Charakterbogen ------------------+
| Name: [__________] |
| Interessen / Fähigkeiten: |
| Mathe: ███░░░░ (3) |
| Sprache: ████░░░ (4) |
| Natur: ██░░░░░ (2) |
| Kreativität: █████░░ (5) |
| Sozial: ███░░░░ (3) |
| Stresslevel: ██░░░░░ (2/10) |
| Motivation: ████░░░ (4/10) |
+----------------------------------------------------+
| [🎲 Werte zufällig generieren] |
| [✅ Bestätigen und Spiel starten] |
+----------------------------------------------------+
🃏 3. Ereignis-Karten (UI/UX + Logik B)
Zweck: Entscheidungstreffen + Werteänderung

Beispielkarte:

diff
Kopieren
Bearbeiten
+-------------------- Ereigniskarte --------------------+
| 📚 Du bekommst eine Mathearbeit zurück. |
| |
| Ergebnis: 3 Punkte besser als erwartet! |
| ➕ Motivation +2 |
| |
| [OK] |
+-------------------------------------------------------+
Entscheidungskarte:

diff
Kopieren
Bearbeiten
+------------------- Entscheidungsereignis ------------------+
| 🤖 Du kannst eine AG wählen – welche interessiert dich? |
| |
| [🎶 Musik-AG → Kreativität +2] |
| [🔧 Robotik-AG → Mathe +1, Natur +1] |
| |
+------------------------------------------------------------+
🎲 4. Würfelmechanik (UI/UX A + Logik B)
Zweck: Zufallsereignisse, Würfelanimation

diff
Kopieren
Bearbeiten
+------------------- Würfelprobe -------------------+
| 🎤 Du hältst einen Vortrag in Englisch |
| Prüfung: Sprache > 5 |
| Ergebnis: [🎲 Du würfelst eine 4] + Sprache: 4 |
| Erfolg! → Motivation +1 |
| |
| [🔁 Weiter] |
+---------------------------------------------------+
Animation: Würfel (1W6) rollt animiert über den Bildschirm.

🗺️ 5. Wochenkarte / Spielübersicht (optional)
Zweck: Visualisierung des Fortschritts

diff
Kopieren
Bearbeiten
+------------------------ Woche 4/10 ------------------------+
| Du bist jetzt in Woche 4. Nächste Woche: Projektarbeit. |
| |
| 💡 Tipp: Achte auf deinen Stresslevel. |
| |
| [📜 Weiter zum nächsten Ereignis] |
+------------------------------------------------------------+
📚 6. Abschlussbildschirm – Fächerwahl (Logik B + UI A)
Zweck: Zeigt Auswertung & Empfehlung

sql
Kopieren
Bearbeiten
+-------------------- Deine Fächerwahl --------------------+
| 🎓 Basierend auf deinen Entscheidungen und Werten: |
| |
| ➤ Du hast in Mathe, Natur und Robotik geglänzt. |
| |
| 🔹 Empfehlung: |
| – Physik LK |
| – Informatik GK |
| – Mathe GK |
| |
| 🧠 Feedback: "Technik und Struktur – du denkst wie |
| ein Ingenieur!" |
| |
| [🔁 Neues Spiel starten] [💾 Spiel speichern] |
+----------------------------------------------------------+
🧰 7. Technisches Grundgerüst
Frontend (React):

Komponenten: CharacterSheet, EventCard, DiceRoller, ChoiceScreen, ResultScreen

State-Management: React useState oder Zustand

Persistenz: localStorage, optional Supabase später

👥 Rollenteilung – Umsetzungshilfe
Bereich Person A (UI/UX) Person B (Logik & System)
Charakterbogen Layout & Animation Datenstruktur, Validierung
Ereignisse/Karten UI-Komponenten, Karten-Design JSON-Tree, Punktelogik
Würfelmechanik Animation & Würfelanzeige Zufallslogik, Erfolgsbedingungen
Fächerwahl-Auswertung Anzeige, Styling, Feedbacktexte Algorithmus zur Empfehlung
Speicherung localStorage, Speichern-Button Struktur im localStorage, später Supabase-Integration
