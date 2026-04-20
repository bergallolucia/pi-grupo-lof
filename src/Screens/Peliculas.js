import React, { Component } from "react";
import Card from "../Components/Card/Card";

class Peliculas extends Component {

  constructor(props) {
    super(props);
    this.state = {
      peliculas: [],
      copiaPeliculas: [], 
      pagina: 1,
      filtro: ""
    };
  }

  componentDidMount() {
    const apiKey = "8ec38789ad70cc9e9d12c6e963cc77be";

    fetch("https://api.themoviedb.org/3/movie/popular?api_key=" + apiKey + "&page=1")
      .then(response => response.json())
      .then((data) => {
        this.setState({
          peliculas: data.results,
          copiaPeliculas: data.results 
        });
      })
      .catch(error => console.log(error));
  }

  cargarMas() {
    const apiKey = "8ec38789ad70cc9e9d12c6e963cc77be";
    let nuevaPagina = this.state.pagina + 1;

    fetch("https://api.themoviedb.org/3/movie/popular?api_key=" + apiKey + "&page=" + nuevaPagina)
      .then(response => response.json())
      .then(data => {

        this.setState({
          peliculas: [...this.state.peliculas, ...data.results], // 👈 cambiado
          copiaPeliculas: [...this.state.copiaPeliculas, ...data.results], // 👈 agregado
          pagina: nuevaPagina
        });

      })
      .catch(error => console.log(error));
  }

  controlarFiltro(event) {
    const valor = event.target.value;

    this.setState({
      filtro: valor,
      peliculas: this.state.copiaPeliculas.filter(pelicula =>
        pelicula.title.toLowerCase().includes(valor.toLowerCase())
      )
    });
  }

render() {

    return (
    <main>
      <div className="section-header">
        <h1>Películas</h1>
      </div>

      <form className="search-form">
        <input
          type="text"
          value={this.state.filtro}
          onChange={(event) => this.controlarFiltro(event)}
          placeholder="Filtrar películas..."
        />
      </form>

      <section className="card-container">
        {this.state.peliculas.length > 0 ? (
          this.state.peliculas.map((pelicula) => {
            return (
              <Card
                key={pelicula.id}
                data={pelicula}
              />
            );
          })
        ) : (
          <p>No hay resultados</p>
        )}
      </section>

      <button onClick={() => this.cargarMas()}>
        Cargar más
      </button>

    </main>
  );
}
}

export default Peliculas;