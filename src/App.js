import React from "react";
import { Route, Switch } from "react-router-dom";
import "./Css/styles.css";

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Screens/Home";
import Peliculas from "./Screens/Peliculas";
import Series from "./Screens/Series";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Notfound from "./Screens/Notfound";
import Favoritos from "./Screens/Favoritos";
import Detalle from "./Screens/Detalle";
import SearchResults from "./Screens/SearchResults";



function App() {

  return(
    
    <div> 
      <Navbar/>
      <Switch>
        <Route path="/" exact={true} component={Home}/> 
        <Route path="/peliculas" component={Peliculas}/> 
        <Route path="/series" component={Series}/> 
        <Route path="/login" component={Login}/> 
        <Route path="/register" component={Register}/> 
        <Route path="/favoritos" component={Favoritos}/> 
        <Route path="/detalle/:tipo/:id" component={Detalle}/>
        <Route path="/search/:busqueda" component={SearchResults} />
        <Route component={Notfound} /> 
      </Switch>

    <Footer />
    </div>
  )
}

export default App; 