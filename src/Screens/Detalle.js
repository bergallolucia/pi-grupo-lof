import React, { Component } from "react";

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

  render() {
    if (!this.state.detalle) {
      return <p>Cargando...</p>;
    }

    const data = this.state.detalle;

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
          </article>
        </section>
      </main>
    );
  }
}

export default Detalle;