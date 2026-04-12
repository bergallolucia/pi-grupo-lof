import React, { Component } from "react";
import Card from "../Card/Card";

class SectionPeliculasPopulares extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: []
    };
  }

  componentDidMount() {
    const apiKey = "8ec38789ad70cc9e9d12c6e963cc77be";

    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
      .then(function(response) {
        return response.json();
      })
      .then((data) => {
        let peliculasFiltradas = data.results.filter(function(item, idx) {
          return idx < 4;
        });

        this.setState({
          peliculas: peliculasFiltradas
        });
      })
      .catch(function(error) {
        console.log("El error fue: " + error);
      });
  }

  render() {
    return (
      <section className="card-container">
        {this.state.peliculas.length > 0 ? (
          this.state.peliculas.map((pelicula) => {
            return <Card 
            key={pelicula.id} 
            data={pelicula} 
            tipo="movie" />;
          })
        ) : (
          <p>Cargando...</p>
        )}
      </section>
    );
  }
}

export default SectionPeliculasPopulares;