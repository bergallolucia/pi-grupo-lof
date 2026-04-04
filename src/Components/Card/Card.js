import React, { Component } from "react";
import { Link } from "react-router-dom";

class Card extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mostrar: false,
            textoBoton: "Ver descripción",
            claseOculta: "oculta"
        };
    }

    cambio() {
        if (this.state.mostrar) {
            this.setState({
                mostrar: false,
                textoBoton: "Ver descripción",
                claseOculta: "oculta"
            });
        } else {
            this.setState({
                mostrar: true,
                textoBoton: "Ocultar descripción",
                claseOculta: ""
            });
        }
    }

    render() {

        const data = this.props.data;

        return (
            <div className="character-card">

                <img
                    src={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
                    alt={data.title}
                />

                <h4>{data.title}</h4>

                <p className={this.state.claseOculta}>
                    {data.overview}
                </p>

                <button onClick={() => this.cambio()}>
                    {this.state.textoBoton}
                </button>

                <Link to={`/detalle/pelicula/${data.id}`}>
                    Ir a detalle
                </Link>

            </div>
        );
    }
}

export default Card;