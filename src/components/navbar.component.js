import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <div className="container" >
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Administrador de Recursos Comisión de la verdad</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Listar Recursos</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Crear recurso</Link>
          </li>
        </ul>
        </div>
      </nav>
      </div>
    );
  }
}