import React from "react";
import FormRegister from "../Components/FormRegister/FormRegister";

function Register(props) {
    return (
        <main>
        <h1 className="tituloRegistro">Crear cuenta</h1>
        <FormRegister history={props.history}  /> 
        </main>
    ); 
}

export default Register; 
