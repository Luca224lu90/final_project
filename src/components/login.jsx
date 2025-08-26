function LoginHeader() {
  return (
    <section>
      <div className="formain">
        <h1>Anmelden</h1>
        <form>
          <label htmlFor="mail">
            <i className="fa-solid fa-at"></i>
          </label>
          <input type="email" id="mail" placeholder="Deine E-Mail..." />
          <label htmlFor="password">
            <i className="fa-solid fa-lock"></i>
          </label>
          <input type="text" id="password" placeholder="Dein Passwort..." />
          <button type="submit">Abschicken</button>
        </form>
      </div>
    </section>
  );
}
export default LoginHeader;
