import React, { useState, useEffect } from "react";
import Card from "../Components/Card/Card";

function Peliculas() {
  const [peliculas, setPeliculas] = useState([]); 
  const [pagina, setPagina] = useState(1); 
  const [filtro, setFiltro] = useState(""); 

  useEffect(()=> {
    const apiKey = "8ec38789ad70cc9e9d12c6e963cc77be";

    fetch("https://api.themoviedb.org/3/movie/popular?api_key=" + apiKey + "&page=1")
      .then(response => response.json())
      .then((data) => {
        setPeliculas(data.results); 
        })
      .catch(error => console.log(error));
  }, []);


function cargarMas() {
    const apiKey = "8ec38789ad70cc9e9d12c6e963cc77be";
    let nuevaPagina = pagina + 1;

    fetch("https://api.themoviedb.org/3/movie/popular?api_key=" + apiKey + "&page=" + nuevaPagina)
      .then(response => response.json())
      .then(data => {
        let peliculasActuales = peliculas;

        data.results.map((pelicula) => {
          peliculasActuales.push(pelicula);
        });

        setPeliculas(peliculasActuales); 
        setPagina(nuevaPagina); 
      })
      .catch(error => console.log(error));
}

function controlarFiltro(event) {
    setFiltro(event.target.value); 
}


let peliculasFiltradas = peliculas.filter((pelicula) => {
  
  if (filtro == "") {
    return true; 
  }

  if (pelicula.title == filtro) {
    return true; 
  }

  return false;

});  

return (
  <main>
    <div className="section-header">
      <h1>Peliculas</h1>
    </div>

    <form>
        <input
          type="text"
          value={filtro}
          onChange={(event) => controlarFiltro(event)}
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

      <button onClick={() => cargarMas()}>
        Cargar más
      </button>

  </main>
); 
}

export default Peliculas;