import React, { useState } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Login(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    return (
      <main>
        <h1 className="tituloRegistro">
            Iniciar sesión
        </h1>
          <section className="registro-container">
            <form
              className="form-register"
              onSubmit={(e) => {
                e.preventDefault();

                  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
                  let usuarioFiltrado = usuarios.filter((user) => {
                    return user.email === email;
                    });

                    if (
                      usuarioFiltrado.length > 0 &&
                      usuarioFiltrado[0].password === password
                    ) {

                      cookies.set("session", email);
                      setError("");
                      alert("Login exitoso");
                      props.history.push("/");

                    } else {
                      setError("Credenciales incorrectas");
                    }

                }}
          >
                <label>Email:</label>

                  <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />

                  <label>Contraseña:</label>

                  <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />

                  <button type="submit">
                    Ingresar
                  </button>

                  {error !== "" ? (
                      <p className="error">{error}</p>
                  ) : null}

            </form>
          </section>
      </main>
    );
  }

export default Login;