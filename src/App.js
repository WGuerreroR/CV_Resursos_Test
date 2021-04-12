import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import ListarRecurso from "./components/recursos-list.component";
import EditarRecurso from "./components/edit-recursos.component";
import CrearRecurso from "./components/create-recursos.component";



function App() {
  return (
  <Router>
      <div >
      <Navbar />
      <br/>
      <Route path="/" exact component={ListarRecurso} />
      <Route path="/edit/:id" component={EditarRecurso} />
      <Route path="/create" component={CrearRecurso} />
   
      </div>
    </Router>
  );
}

export default App;
