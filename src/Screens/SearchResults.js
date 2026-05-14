import React from "react";
import Card from "../Components/Card/Card"; 
import { useState, useEffect} from "react"; 

function SearchResults(props) {
    const [resultados, setResultados] = useState([]); 

    useEffect(() => {
        const apiKey = "8ec38789ad70cc9e9d12c6e963cc77be"; 
        let busqueda = props.match.params.busqueda;
        let tipo = props.match.params.tipo; 
        let url = ""; 
        
        if (tipo == "movie") {
            url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${busqueda}`; 

        } else if (tipo == "tv") {
            url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${busqueda}`; 
        }
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                setResultados(data.results); 
                })
                .catch((error) => console.log("El error fue: " + error));
    }, [props.match.params.busqueda, props.match.params.tipo]);

    return (
        <main> 
            <h1>Resultados de busqueda</h1>

            {resultados.length > 0 ? (
                <section className="card-Container">
                    {resultados.map((item, idx) => (
                        <Card 
                        key={idx} 
                        data={item} />
                    ))}
                </section>
            ) : (
                <p>Lo siento. No hay resultados para tu búsqueda. </p>
            )}
        </main>
    );


}

export default SearchResults; 