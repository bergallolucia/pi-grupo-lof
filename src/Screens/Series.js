import React, { useState, useEffect } from "react";
import Card from "../Components/Card/Card";

function Series() {
  const [series, setSeries] = useState([]); 
  const [pagina, setPagina] = useState(1); 
  const [filtro, setFiltro] = useState(""); 

  useEffect(() => {
    const apiKey = "8ec38789ad70cc9e9d12c6e963cc77be";
    fetch("https://api.themoviedb.org/3/tv/popular?api_key=" + apiKey + "&page=1")
      .then(response => response.json())
      .then((data) => {
        setSeries(data.results);  
      })
      .catch(error => console.log(error));
    }, []); 

  function cargarMas() {
    const apiKey = "8ec38789ad70cc9e9d12c6e963cc77be";
    let nuevaPagina = pagina + 1;

    fetch("https://api.themoviedb.org/3/tv/popular?api_key=" + apiKey + "&page=" + nuevaPagina)
      .then(response => response.json())
      .then(data => {
        let seriesActuales = series;

          data.results.map((serie) => {
            seriesActuales.push(serie);
          });

          setSeries(seriesActuales); 
          setPagina(nuevaPagina); 
        })
        .catch(error => console.log(error));
  }

  function controlarFiltro(event) {
      setFiltro(event.target.value);
  }

  let seriesFiltradas = series.filter((serie) => {

    if (filtro === "") {
        return true;
    }

    if (serie.name === filtro) {
        return true;
    }

    return false;
    });

  return (
        <main>
          <div className="section-header">
            <h1>Series</h1>
          </div>

          <form className="search-form">
            <input
              type="text"
              value={filtro} 
              onChange={(event) => controlarFiltro(event)}
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

          <button onClick={() => cargarMas()}>
            Cargar más
          </button>
        </main>
      );
}

export default Series;




