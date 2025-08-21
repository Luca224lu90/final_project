import express from "express";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());

let users = []; // Fake-Datenbank im RAM

// Registrieren
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // Passwort sicher hashen
  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({ email, passwordHash: hashedPassword });

  res.json({ message: "User erstellt!" });
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(401).json({ error: "User nicht gefunden" });

  // Passwort prüfen
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ error: "Falsches Passwort" });

  res.json({ message: "Login erfolgreich!" });
});

app.listen(3000, () => console.log("Server läuft auf http://localhost:3000"));
