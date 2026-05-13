import React, { useState } from "react";
import { withRouter } from "react-router-dom";



function SearchForm(props) {
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("movie");

const evitarSubmit = (event) => {
  event.preventDefault();

  props.history.push(`/search/${this.state.tipo}/${this.state.valor}`);
}

  const controlarCambiosV = (event) => {
    setValor(event.target.value);
    };
  }

  const controlarCambiosT = (event) => {
    setTipo(event.target.value);
    };
  
  return (
      <form 
        className="search-form"
        onSubmit={evitarSubmit}
      >
        <input
          type="text"
          value={valor}
          onChange={controlarCambiosV}
          placeholder="Buscar películas o series..."
        />

        <select
        value= {tipo}
        onChange={controlarCambiosT}>

        <option value="movie">Películas</option>
        <option value="tv">Series</option>
        
        </select>
        <button type="submit">Buscar</button>
      </form>
    );

export default withRouter(SearchForm);