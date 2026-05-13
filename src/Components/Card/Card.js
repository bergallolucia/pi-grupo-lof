import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Card(props) {

    const [mostrar, setMostrar] = useState(false);
    const [textoBoton, setTextoBoton] = useState("Ver descripción");
    const [claseOculta, setClaseOculta] = useState("oculta");

    function cambio() {
        if (mostrar) {
            setMostrar(false);
            setTextoBoton("Ver descripción");
            setClaseOculta("oculta");
        } else {
            setMostrar(true);
            setTextoBoton("Ocultar descripción");
            setClaseOculta("");
        }
    }

    function guardarFavorito() {
        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

        let favoritoNuevo = {
            id: props.data.id,
            tipo: props.tipo,
            poster_path: props.data.poster_path,
            title: props.data.title,
            name: props.data.name
        };

        let yaExiste = favoritos.filter(
            (fav) => fav.id === favoritoNuevo.id
        ).length > 0;

        if (!yaExiste) {
            favoritos.push(favoritoNuevo);
            localStorage.setItem("favoritos", JSON.stringify(favoritos));
        }
    }

    const data = props.data;
    let session = cookies.get("session");

    return (
        <div className="character-card">

            <img
                src={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
                alt={data.title || data.name}
            />

            <h4>{data.title || data.name}</h4>

            <p className={claseOculta}>
                {data.overview}
            </p>

            <div className="botones">

                <button onClick={() => cambio()}>
                    {textoBoton}
                </button>

                <Link to={`/detalle/${props.tipo}/${data.id}`}>
                    Ir a detalle
                </Link>

                {session ? (
                    <button
                        className="boton-favorito"
                        onClick={() => guardarFavorito()}
                    >
                        ❤️
                    </button>
                ) : null}

            </div>

        </div>
    );
}

export default Card;