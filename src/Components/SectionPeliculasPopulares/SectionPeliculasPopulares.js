import React, { useState, useEffect } from "react";
import Card from "../Card/Card";

function SectionPeliculasPopulares() {
    const [peliculas, setPeliculas] = useState([]);

    useEffect(() => {
        const apiKey = "8ec38789ad70cc9e9d12c6e963cc77be";

        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
            .then(function(response) {
                return response.json();
            })
            .then((data) => {
                let peliculasFiltradas = data.results.filter(function(item, idx) {
                    return idx < 4;
                });
                setPeliculas(peliculasFiltradas);
            })
            .catch(function(error) {
                console.log("El error fue: " + error);
            });
    }, []);

    return (
        <section className="card-container">
            {peliculas.length > 0 ? (
                peliculas.map((pelicula) => {
                    return (
                        <Card
                            key={pelicula.id}
                            data={pelicula}
                            tipo="movie"
                        />
                    );
                })
            ) : (
                <p>Cargando...</p>
            )}

        </section>
    );
}

export default SectionPeliculasPopulares;