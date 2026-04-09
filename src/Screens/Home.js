import React from "react";
import SectionPeliculasPopulares from "../Components/SectionPeliculasPopulares/SectionPeliculasPopulares"
import SectionSeriesPopulares from "../Components/SectionSeriesPopulares/SectionSeriesPopulares"
import SearchForm from "../Components/SearchForm/SearchForm";

function Home() {
  return (
    <main>
      <SearchForm/>
      <section>
        <h1>Peliculas más populares</h1>
        <SectionPeliculasPopulares />
      </section>

      <section>
        <h1>Series más populares</h1>
        <SectionSeriesPopulares />
      </section>
    </main>
  )
}

export default Home;