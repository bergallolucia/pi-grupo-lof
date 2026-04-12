import React from "react";
import SectionPeliculasPopulares from "../Components/SectionPeliculasPopulares/SectionPeliculasPopulares";
import SectionSeriesPopulares from "../Components/SectionSeriesPopulares/SectionSeriesPopulares";
import SearchForm from "../Components/SearchForm/SearchForm";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      <SearchForm/>
      <section>
        <div className="section-header">
          <h1>Peliculas más populares</h1>
          <Link to="/peliculas" className="ver-todas">Ver todas</Link>
        </div>
        <SectionPeliculasPopulares />
      </section>

      <section>
        <div className="section-header">
          <h1>Series más populares</h1>
          <Link to="/series" className="ver-todas">Ver todas</Link>
        </div>
        <SectionSeriesPopulares />
      </section>
    </main>
  )
}

export default Home; 