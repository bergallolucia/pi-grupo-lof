import React, { Component } from "react";
import Card from "../Components/Card/Card";

class Peliculas extends Component {

  constructor(props) {
    super(props);
    this.state = {
      peliculas: [],
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
          peliculas: data.results
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

        let peliculasActuales = this.state.peliculas; 

        data.results.map((pelicula) => {
          peliculasActuales.push(pelicula);
        });

        this.setState({
          peliculas: peliculasActuales,
          pagina: nuevaPagina
        });

      })
      .catch(error => console.log(error));
  }

  controlarFiltro(event) {
    this.setState({
      filtro: event.target.value
    });
  }

render() {

  let peliculasFiltradas = this.state.peliculas.filter((pelicula) => {

    if (this.state.filtro === "") {
      return true;
    }

    if (pelicula.title === this.state.filtro) {
      return true;
    }

    return false;
  });

    return (
    <main>
      <h1>Películas</h1>

      <form>
        <input
          type="text"
          value={this.state.filtro}
          onChange={(event) => this.controlarFiltro(event)}
          placeholder="Filtrar películas..."
        />
      </form>

      <section className="card-container">
        {peliculasFiltradas.length > 0 ? (
          peliculasFiltradas.map((pelicula) => {
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
