import React, { Component } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }

  render() {
    return (
      <main>

        <h1 className="tituloRegistro">Iniciar sesión</h1>

        <section className="registro-container">

          <form
            className="form-register"
            onSubmit={(e) => {
              e.preventDefault();

              let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

              let usuarioFiltrado = usuarios.filter((user) => {
                return user.email === this.state.email;
              });

              if (
                usuarioFiltrado.length > 0 &&
                usuarioFiltrado[0].password === this.state.password
              ) {

                cookies.set("session", this.state.email);

                this.setState({ error: "" });

                alert("Login exitoso");

              } else {
                this.setState({
                  error: "Credenciales incorrectas"
                });
              }
            }}
          >

            <label>Email:</label>
            <input
              type="email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />

            <label>Contraseña:</label>
            <input
              type="password"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />

            <button type="submit">Ingresar</button>

            {this.state.error !== "" ? (
              <p className="error">{this.state.error}</p>
            ) : null}

          </form>

        </section>

      </main>
    );
  }
}

export default Login;