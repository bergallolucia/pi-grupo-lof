import React, { useState } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function FormRegister(props) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function submit(event) {
        event.preventDefault();
        let nuevoUsuario = {
            username: username,
            email: email,
            password: password,
            createdAt: Date.now()
        };

        if (username.length === 0) {
            setError("El nombre de usuario no puede estar vacío");
            return;
        }

        if (email === "") {
            setError("email mal escrito");
            return;
        }

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        let usuarioStorage = localStorage.getItem("usuarios");

        if (usuarioStorage != null) {
            let usuarioParseado = JSON.parse(usuarioStorage);

            let usuarioFiltrado = usuarioParseado.filter(function(usuario) {
                return usuario.email === nuevoUsuario.email;
            });

            if (usuarioFiltrado.length > 0) {
                setError("Ya existe un usuario registrado con este mail");
                return;

            } else {
                usuarioParseado.push(nuevoUsuario);
                let usuarioJson = JSON.stringify(usuarioParseado);
                localStorage.setItem("usuarios", usuarioJson);
                cookies.set("session", email);
                props.history.push("/login");
            }

        } else {
            let usuarioInicial = [nuevoUsuario];
            let usuarioJson = JSON.stringify(usuarioInicial);
            localStorage.setItem("usuarios", usuarioJson);
            cookies.set("session", email);
            props.history.push("/login");
        }

        setUsername("");
        setEmail("");
        setPassword("");
        setError("");
    }

    return (
        <div className="registro-container">

            <form className="form-register" onSubmit={(event) => submit(event)}>
                <label>
                    Nombre de usuario:
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </label>

                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </label>

                <label>
                    Contraseña:
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </label>

                <button type="submit">Crear cuenta</button>

                {error !== "" ? <p className="error">{error}</p> : null}

            </form>
        </div>
    );
}

export default FormRegister;