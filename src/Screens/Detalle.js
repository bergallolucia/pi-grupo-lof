import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import Loader from "../Components/Loader/Loader";

const cookies = new Cookies();

function Detalle(props) {
  const [detalle, setDetalle] = useState(null);

  useEffect(() => {
    const apiKey = "8ec38789ad70cc9e9d12c6e963cc77be"; 
    const tipo = this.props.match.params.tipo; 
    const id = this.props.match.params.id;

    fetch(`https://api.themoviedb.org/3/${tipo}/${id}?api_key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        setDetalle(data);
        })
      .catch((error) => console.log(error));
  } , []);
  
  const guardarFavorito = () => {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    let favoritoNuevo = {
      id: detalle.id,
      tipo: match.params.tipo,
      poster_path: detalle.poster_path,
      title: detalle.title,
      name: detalle.name 
    };

    let yaExiste = favoritos.filter( (fav) => fav.id === favoritoNuevo.id && fav.tipo === favoritoNuevo.tipo).length > 0;

    if (!yaExiste) {
      favoritos.push(favoritoNuevo); 
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }
  };

  if (!detalle) {
      return <Loader/>;
    }

    const data = detalle;
    let session = cookies.get("session");

    return (
      <main>
        <section className="detalle-container">
          <img
            className="detalle-img"
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt={data.title || data.name} 
          />

          <article className="detalle-info"> 
            <h1>{data.title || data.name}</h1>

            <p><strong>Calificación:</strong> {data.vote_average}</p>

            <p>
              <strong>Fecha de estreno:</strong> {data.release_date || data.first_air_date}
            </p>

            {data.runtime ? (
              <p><strong>Duración:</strong> {data.runtime} minutos</p>
            ) : null}

            <p><strong>Sinopsis:</strong> {data.overview}</p>

            <p>
              <strong>Géneros:</strong>
              {data.genres && data.genres.map((g, i) => (
                <span key={i}> {g.name} </span>

                ))}
            </p>

            {session ? (
              <div className="detalle-favorito">
                <button className="boton-favorito"
                  onClick={() => this.guardarFavorito()}
                >
                  ❤️
                </button>
              </div>
            ) : null}

          </article>
        </section>
      </main>
    );
  }


export default Detalle;