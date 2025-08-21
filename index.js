import express from "express";
import users from "./users.json" with {type: "json"};
// console.log(users);
const PORT = 1234;
const app = express();
app.use(express.json());
app.get("/login/:userID", (req, res) => {
    console.log(req.params.userID); // <- dieser Nutzer wird gesucht
    // Überstimmung mit Nutzern in users finden (die aus der .json Datei sind)
    // res.json(gefundener Nutzer)
});
app.listen(PORT, () => {
    console.log("Hallo! Ich bin ein Server und laufe auf Port 1234.")
})