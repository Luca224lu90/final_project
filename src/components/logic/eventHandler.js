// JavaScript (Frontend)
fetch("https://example.com/api/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "user@example.com",
    password: "123456",
  }),
})
  .then((response) => response.json())
  .then((data) => {
    if (data.token) {
      localStorage.setItem("token", data.token); // Token speichern
    } else {
      alert("Login fehlgeschlagen");
    }
  });
