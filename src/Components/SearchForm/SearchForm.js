import React, { Component } from "react";
import { withRouter } from "react-router-dom";



class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valor: "", 
      tipo: "movie"
    };
  }

evitarSubmit(event){
  event.preventDefault();

  this.props.history.push(`/search/${this.state.tipo}/${this.state.valor}`);
}

  controlarCambiosV(event) {
    this.setState({
      valor: event.target.value
    });
  }

   controlarCambiosT(event) {
    this.setState({
      tipo: event.target.value
    });
  }

  render() {
    return (
      <form
        className="search-form"
        onSubmit={(event) => this.evitarSubmit(event)} 
      >
        <input
          type="text"
          value={this.state.valor}
          onChange={(event) => this.controlarCambiosV(event)}
          placeholder="Buscar películas o series..."
        />

        <select
        value= {this.state.tipo}
        onChange={(event) => this.controlarCambiosT(event)}>

        <option value="movie">Películas</option>
        <option value="tv">Series</option>
        
        </select>
        <button type="submit">Buscar</button>
      </form>
    );
  }
}

export default withRouter(SearchForm);