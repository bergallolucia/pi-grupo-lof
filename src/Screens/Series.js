import React, { Component } from "react";
import Card from "../Components/Card/Card";

class Series extends Component {

  constructor(props) {
    super(props);
    this.state = {
      series: [],
      pagina: 1,
      filtro: ""
    };
  }

  componentDidMount() {
    const apiKey = "8ec38789ad70cc9e9d12c6e963cc77be" 

    fetch("https://api.themoviedb.org/3/tv/popular?api_key=" + apiKey + "&page=1")
      .then(response => response.json())
      .then((data) => {
        this.setState({
          series: data.results
        });
      })
      .catch(error => console.log(error));
  }

  cargarMas() {
    const apiKey = "8ec38789ad70cc9e9d12c6e963cc77be"
    let nuevaPagina = this.state.pagina + 1;

    fetch("https://api.themoviedb.org/3/tv/popular?api_key=" + apiKey + "&page=" + nuevaPagina)
      .then(response => response.json())
      .then(data => {

        let seriesActuales = this.state.series;

        data.results.map((serie) => {
          seriesActuales.push(serie);
        });

        this.setState({
          series: seriesActuales,
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

    let seriesFiltradas = this.state.series.filter((serie) => {

      if (this.state.filtro === "") {
        return true;
      }

      if (serie.name === this.state.filtro) {
        return true;
      }

      return false;
    });

    return (
      <main>
        <h1>Series</h1>

        <form>
          <input
            type="text"
            value={this.state.filtro}
            onChange={(event) => this.controlarFiltro(event)}
            placeholder="Filtrar series..."
          />
        </form>

        <section className="card-container">
          {seriesFiltradas.length > 0 ? (
            seriesFiltradas.map((serie) => {
              return (
                <Card
                  key={serie.id}
                  data={serie}
                  tipo="tv"
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

export default Series;