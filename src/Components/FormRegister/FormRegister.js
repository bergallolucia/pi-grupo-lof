import React from "react";
import { Component } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class FormRegister extends Component {
    constructor(props) {
        super(props); 
        this.state = {
           username: "", 
           email: "", 
           password: "", 
           error: ""
        }; 
    }

    controlarCambiosUN(event) {
        this.setState({
            username: event.target.value
        }); 
    }

    controlarCambiosE(event) {
        this.setState({
            email: event.target.value
        }); 
    }

    controlarCambiosP(event) {
        this.setState({
            password: event.target.value
        }); 
    }

    submit(event) {
        event.preventDefault(); 
        let nuevoUsuario = {
            username: this.state.username, 
            email: this.state.email, 
            password: this.state.password, 
            createdAt: Date.now()
        }; 

        if (this.state.username.length === 0) {
             this.setState({
            error: "El nombre de usuario no puede estar vacío"
            });
             return; 
        }

        if (this.state.email == "") {
            this.setState({
                error: "email mal escrito"
            }); 
            return; 
        }

        if (this.state.password.length < 6) {
            this.setState({
                error: "La contraseña debe tener al menos 6 caracteres"
            });
            return; 
        }

        let usuarioStorage = localStorage.getItem("usuarios"); 

        if (usuarioStorage != null) {
            let usuarioParseado = JSON.parse(usuarioStorage); 
            let usuarioFiltrado = usuarioParseado.filter(function(usuario) {
                return usuario.email === nuevoUsuario.email; 
            }); 

            if (usuarioFiltrado.length > 0) {
                this.setState({
                    error: "Ya existe un usuario registrado con este mail"
                }); 
                return; 

            } else {
                usuarioParseado.push(nuevoUsuario); 

                let usuarioJson = JSON.stringify(usuarioParseado); 

                localStorage.setItem("usuarios", usuarioJson); 

                cookies.set("session", this.state.email, { path: "/" });

                this.props.history.push("/login")
            } 

        }else {
            let  usuarioInicial = [nuevoUsuario]; 
            let usuarioJson = JSON.stringify(usuarioInicial); 

            localStorage.setItem("usuarios", usuarioJson); 

            this.props.history.push("/login")

        }

        this.setState({ 
            username: "", 
            email: "", 
            password: "",
            error: ""
        }); 

    }

    render() {
        return (
            <div className="registro-container">

            <form className="form-register" onSubmit={(event) => this.submit(event)}>
                <label>
                    Nombre de usuario:
                    <input 
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={(event) => this.controlarCambiosUN(event)} 
                    />
                </label>

                <label>
                    Email:
                    <input 
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={(event) => this.controlarCambiosE(event)} 
                    />
                </label>

                <label>
                    Contraseña:
                    <input 
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={(event) => this.controlarCambiosP(event)} 
                    />
                </label>

                <button type="submit"> Crear cuenta </button>

                {this.state.error != "" ? <p className="error">{this.state.error}</p> : null}

            </form>
            </div>
        );
    }
}; 
    
export default FormRegister; 

