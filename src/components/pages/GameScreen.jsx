// GameScreen.jsx
import React from "react";
import background from "../assets/background.jpg";

export default function GameScreen() {
  return (
    <div
      className="h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <h1 className="text-white text-3xl p-6">Willkommen im Spiel!</h1>
    </div>
  );
}
