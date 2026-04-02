import React from "react";
import Menu from "../Menu/Menu";

function Navbar() {
  return (
    <header>

      <div className="logo-container">
        <img src="/img/logo.png" alt="logo" className="logo" />
      </div>

      <h1 className="titulo-pagina">LOF</h1>

      <nav>
        <Menu />
      </nav>

    </header>
  );
}

export default Navbar;