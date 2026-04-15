import React from "react";
import Card from "../Components/Card/Card"; 
import { Component} from "react"; 

class SearchResults extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            resultados: []
        }; 
    }

    componentDidMount() {
        const apiKey = "8ec38789ad70cc9e9d12c6e963cc77be"; 
        let busqueda = this.props.match.params.busqueda;
        let tipo = this.props.match.params.tipo; 
        let url = ""; 
        
        if (tipo == "movie") {
            url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${busqueda}`; 

        } else if (tipo == "tv") {
            url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${busqueda}`; 
        }
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    this.setState({
                        resultados: data.results
                    }); 
                })
                .catch((error) => console.log("El error fue: " + error));
    }

render () {
    return (
        <main> 
            <h1>Resultados de busqueda</h1>

            {this.state.resultados.length > 0 ? (
                <section className="card-Container">
                    {this.state.resultados.map((item, idx) => (
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
}
export default SearchResults; 