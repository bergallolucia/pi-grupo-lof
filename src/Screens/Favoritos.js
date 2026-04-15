import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Favoritos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritos: []
    };
  }

  componentDidMount() {
    let session = cookies.get("session");

    if (!session) {
      this.props.history.push("/login");
    }

    let recuperoStorage = localStorage.getItem("favoritos");
    let favoritosRecuperados = JSON.parse(recuperoStorage) || [];

    this.setState({
      favoritos: favoritosRecuperados
    });
  }

  borrarFavorito(id) {
    let filtrados = this.state.favoritos.filter((fav) => fav.id !== id);

    localStorage.setItem("favoritos", JSON.stringify(filtrados));

    this.setState({
      favoritos: filtrados
    });
  }

  render() {
    let peliculasFavoritas = this.state.favoritos.filter((fav) => fav.tipo === "movie");
    let seriesFavoritas = this.state.favoritos.filter((fav) => fav.tipo === "tv");

    return (
      <main>
        <section>
          <div className="section-header">
            <h1>Películas favoritas</h1>
          </div>

          <div className="card-container">
            {peliculasFavoritas.map((fav, idx) => (
              <div className="character-card" key={idx}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${fav.poster_path}`}
                  alt={fav.title || fav.name}
                />

                <h4>{fav.title || fav.name}</h4>

                <div className="botones">
                  <Link to={`/detalle/${fav.tipo}/${fav.id}`}>Ir a detalle</Link>
                  <button onClick={() => this.borrarFavorito(fav.id)}>
                    Quitar de favoritos
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="section-header">
            <h1>Series favoritas</h1>
          </div>

          <div className="card-container">
            {seriesFavoritas.map((fav, idx) => (
              <div className="character-card" key={idx}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${fav.poster_path}`}
                  alt={fav.title || fav.name}
                />

                <h4>{fav.title || fav.name}</h4>

                <div className="botones">
                  <Link to={`/detalle/${fav.tipo}/${fav.id}`}>Ir a detalle</Link>
                  <button onClick={() => this.borrarFavorito(fav.id)}>
                    Quitar de favoritos
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    );
  }
}

export default Favoritos;