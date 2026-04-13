import React from "react";
import { Link } from "react-router-dom";

function Notfound() {
  return (
    <main className="notfound-main">
      <h1 className="notfound-titulo">404</h1>
      <h2 className="notfound-subtitulo">Página no encontrada</h2>
      <p className="notfound-respuesta">
        La ruta que intentaste visitar no existe.
      </p>

      <Link to="/" className="notfound-inicio">
        Volver al inicio
      </Link>
    </main>
  );
}

export default Notfound;