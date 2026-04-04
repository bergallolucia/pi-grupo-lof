import React from "react";

function SearchForm() {
  return (
    <form className="search-form">
      <input type="text" placeholder="Buscar..." />
      <button type="submit">Buscar</button>
    </form>
  );
}

export default SearchForm;