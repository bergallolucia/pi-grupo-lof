import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

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

    guardarFavorito() {
        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

        let favoritoNuevo = {
            id: this.props.data.id,
            tipo: this.props.tipo,
            poster_path: this.state.detalle.poster_path,
            title: this.props.data.title,
            name: this.props.data.name
        };

        let yaExiste = favoritos.filter(
            (fav) => fav.id === favoritoNuevo.id
        ).length > 0;

        if (!yaExiste) {
            favoritos.push(favoritoNuevo);
            localStorage.setItem("favoritos", JSON.stringify(favoritos));
        }
    }

    render() {

        const data = this.props.data;
        let session = cookies.get("session");

        return (
            <div className="character-card">

                <img
                    src={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
                    alt={data.title || data.name}
                />

                <h4>{data.title || data.name}</h4>

                <p className={this.state.claseOculta}>
                    {data.overview}
                </p>

                <div className="botones">

                    <button onClick={() => this.cambio()}>
                        {this.state.textoBoton}
                    </button>

                    <Link to={`/detalle/${this.props.tipo}/${data.id}`}>
                        Ir a detalle
                    </Link>

                    {session ? (
                        <button
                            className="boton-favorito"
                            onClick={() => this.guardarFavorito()}
                        >
                            ❤️
                        </button>
                    ) : null}

                </div>

            </div>
        );
    }
}

export default Card;