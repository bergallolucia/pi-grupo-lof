import React from "react";
import { Link } from "react-router-dom";

function Menu() {

  const navIzq = [
    { path: "/", name: "Home" },
    { path: "/peliculas", name: "Películas" },
    { path: "/series", name: "Series" },
    { path: "/favoritos", name: "Favoritas" }
  ];

  const navDer = [
    { path: "/register", name: "Registro" },
    { path: "/login", name: "Login" }
  ];

  return (
    <div className="main-nav">

      <ul className="nav-izq">
        {navIzq.map((item, i) => (
          <li key={i}>
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>

      <ul className="nav-der">
        {navDer.map((item, i) => (
          <li key={i}>
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default Menu;