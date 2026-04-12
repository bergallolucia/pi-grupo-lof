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

        fetch(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${busqueda}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                resultados: data.results
            }); 
    }) 

    .catch((error) => console.log("El error fue: + error")); 
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
                <p>Lo siento. No hay resultados para tu busqueda. </p>
            )}
        </main>
    );
}

}

export default SearchResults