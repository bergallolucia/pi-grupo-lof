import React, { Component } from "react";
import Card from "../Card/Card";

class SectionSeriesPopulares extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: []
    };
  }

  componentDidMount() {
    const apiKey = "8ec38789ad70cc9e9d12c6e963cc77be";

    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`)
      .then(function(response) {
        return response.json();
      })
      .then((data) => {
        let seriesFiltradas = data.results.filter(function(item, idx) {
          return idx < 4;
        });

        this.setState({
          series: seriesFiltradas
        });
      })
      .catch(function(error) {
        console.log("El error fue: " + error);
      });
  }

  render() {
    return (
      <section className="card-container">
        {this.state.series.length > 0 ? (
          this.state.series.map((serie) => {
            return <Card key={serie.id} data={serie} tipo="tv" />;
          })
        ) : (
          <p>Cargando...</p>
        )}
      </section>
    );
  }
}

export default SectionSeriesPopulares;