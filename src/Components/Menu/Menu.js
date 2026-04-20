import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

function Menu() {
  const cookies = new Cookies();
  let sesion = cookies.get("session"); 

  return (
    <div className="main-nav">

      <ul className="nav-izq">
        <li> 
          <Link to="/">Home</Link>
        </li>

        <li> 
          <Link to="/peliculas">Películas</Link>
        </li>

        <li> 
          <Link to="/series">Series</Link>
        </li>

        {sesion ? (
          <li>
            <Link to="/favoritos">Favoritos</Link>
          </li>
        ) : null}
      </ul>

      <ul className="nav-der">
        {sesion ? null : (
          <div> 
          <li> 
            <Link to="/register">Crear cuenta</Link>
          </li>

          <li> 
            <Link to="/login">Login</Link>
          </li>
          </div>
        )}
      </ul>
    </div>
  );
}

export default (Menu);