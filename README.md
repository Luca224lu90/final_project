# final_project

Unsere App-Idee: "Chose your own decision" – Entscheidungsbasiertes Schulabenteuer mit Fächerwahl-Fokus
Eine interaktive, webbasierte PnP-inspirierte App, in der die Spielenden Schulkinder sind, die Entscheidungen zu ihren eigenen Interessen im Schulalltag treffen.
Kleine Konflikte und Situationen die eine Entscheidungsfindung im Schulalltag unterstützen sollten, damit es den Kindern später leichter fällt, welche Fächer später gewählt werden können – mit individuellen Stärken, Schwächen, Interessen und Vorlieben.
Ziel der App:
Ein spielerischer, aber nicht leichter Weg, die Fächerwahl als Entscheidungsprozess zu unterstützen. Ideal z. B. für Schüler*innen, die gerne auf spielerische Weise herausfinden wollen, was ihre Fähigkeiten sind.
Die App zeigt im Laufe des Spiels die Interessen, Talente, der Kinder und hilft mit unterstützenden Fragen diese Entscheidungen der Fächerwahlen gut zu bewältigen.
Kernfeatures (angepasst auf Schulalltag):
Stehender_mann: Charakterbogen:
Name, Interessen (Startwerte in Mathe, Sprache, Natur, Kreativität, Sozial)
Stress-Level, Motivation, Tageszeit (optional)
Spielwürfel: Würfelsystem:
Zufallsereignisse (z. B. "Du bekommst eine Mathearbeit zurück – 1W6 Motivation")
Proben: z. B. "Fremdsprachen-Vortrag halten – Sprachen > 5?"
Schwarzer_joker: Karten/Ereignisse:
"Du bekommst eine AG angeboten – Musik oder Robotik?"
"Du hast einen Streit mit der Bio-Lehrerin – Bio -1"
"Du hilfst beim Schulfest – Sozial +2, Zeit -1"
Weltkarte: Entscheidungspfad:
Räume = Schulwochen / Ereignisse
Jede Entscheidung verändert das Fähigkeitsprofil
Nach 10 "Wochen" wird die Fächerwahl präsentiert
Empfehlung: 3 Wahlmöglichkeiten, beeinflusst durch Werte
Bücher: Fächerwahl-Logik (Ziel-Moment):
Am Ende des Spiels erhält die Spielfigur eine individuelle Fächerempfehlung oder -freigabe, z. B.:
Du hast dich in Naturwissenschaften, Mathe und Robotik profiliert. Dir wird empfohlen:
Physik Leistungskurs
Informatik
Mathe GK
Optional auch mit ironischem Ton oder Feedback („Kunst als Ventil für deinen Schulstress – sehr passend!“)
Hammer_und_schraubenschlüssel: Technische Umsetzungsideen (wie zuvor, aber angepasst):
Frontend (React):
UI für Charakterbogen
Ereignis-Karten mit Entscheidungen
Würfelmechanik mit Animation
Fächerwahl-Bildschirm mit personalisiertem Ergebnis
Speicherung:
localStorage für Spielstand
Optional: Supabase für spätere Spielstand-Uploads, Lehrer*innen-Modus etc.
Kinder_mit_hasenohren_feiern
Rollenteilung für 2 Personen:
Person A – UI/UX
Startbildschirm, Charakterbogen
Karten & Würfel UI
Ergebnisanzeige (Fächerwahl)
Styling & Animationen
Person B – Spiel-/Entscheidungslogik
JSON-basierter Decision Tree für Ereignisse
Punktesystem / Statusmanagement
Fächerwahl-Empfehlungs-Algorithmus
Speicherlogik / Persistenz

import readlineSync from "readline-sync";
