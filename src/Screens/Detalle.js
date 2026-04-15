import React, { Component } from "react";
import Cookies from "universal-cookie";
import Loader from "../Components/Loader";

const cookies = new Cookies();

class Detalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detalle: null
    };
  }

  componentDidMount() {
    const apiKey = "8ec38789ad70cc9e9d12c6e963cc77be";
    const tipo = this.props.match.params.tipo;
    const id = this.props.match.params.id;

    fetch(`https://api.themoviedb.org/3/${tipo}/${id}?api_key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          detalle: data
        });
      })
      .catch((error) => console.log(error));
  }
  guardarFavorito() {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    let favoritoNuevo = {
      id: this.state.detalle.id,
      tipo: this.props.match.params.tipo,
      poster_path: this.state.detalle.poster_path,
      title: this.state.detalle.title,
      name: this.state.detalle.name
    };

    let yaExiste = favoritos.filter( (fav) => fav.id === favoritoNuevo.id && fav.tipo === favoritoNuevo.tipo).length > 0;

    if (!yaExiste) {
      favoritos.push(favoritoNuevo);
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }
  }

  render() {
    if (!this.state.detalle) {
      return <Loader/>;
    }

    const data = this.state.detalle;
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
}

export default Detalle;