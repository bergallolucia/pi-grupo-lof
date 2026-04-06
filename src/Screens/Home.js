import React from "react";
import SectionPopulares from "../Components/SectionPopulares/SectionPopulares"
import SectionEnCartel from "../Components/SectionEnCartel/SectionEnCartel"
import SearchForm from "../Components/SearchForm/SearchForm";

function Home() {
  return (
    <main>
      <SearchForm/>
      <section>
        <h1>Peliculas más populares</h1>
        <SectionPopulares />
      </section>

      <section>
        <h1>Peliculas en cartel</h1>
        <SectionEnCartel />
      </section>
    </main>
  )
}

export default Home;