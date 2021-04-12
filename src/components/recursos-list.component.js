import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



const Recurso = props => (
  <tr>
    <td>{props.recurso.fuente}</td>
    <td>{props.recurso.titulo}</td>
    <td>{props.recurso.claves.join()}</td>
    <td>{props.recurso.descripcion}</td>
    <td>{props.recurso.tipo_recurso}</td>
    
    <td>{props.recurso.cobertura.rangoFecha.min_fecha}</td>
    <td>{props.recurso.cobertura.rangoFecha.max_fecha}</td>
    <td>{props.recurso.cobertura.lugares.join()}</td>
    <td>{props.recurso.cobertura.localizacion.coordinates[0]}</td>
    <td>{props.recurso.cobertura.localizacion.coordinates[1]}</td>
    <td>
      <Link to={"/edit/"+props.recurso._id}>Editar</Link> | <a href="#" onClick={() => { props.deleteRecurso(props.recurso._id) }}>Borrar</a>
    </td>
  </tr>
)

export default class ListarRecurso extends Component {
  constructor(props) {
    super(props);

    this.deleteRecurso = this.deleteRecurso.bind(this)

    this.state = {recursos: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/recursos/')
      .then(response => {
        this.setState({ recursos: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteRecurso(id) {
    axios.delete('http://localhost:5000/recursos/'+id)
      .then(response => { console.log(response.data)
            alert("Registro eliminado!");
    });

    this.setState({
      recursos: this.state.recursos.filter(el => el._id !== id)
    })
  }

  recursoList() {
    return this.state.recursos.map(currentrecurso => {
      return <Recurso recurso={currentrecurso} deleteRecurso={this.deleteRecurso} key={currentrecurso._id}/>;
    })
  }

  render() {
    return (
      <div style={{margin: 30 + 'px'}} >
        <h3>Recursos</h3>
        <table className="table table-striped table-bordered" >
          <thead >
            <tr>
              <th>Fuente</th>
              <th>Titulo</th>
              <th>Claves</th>
              <th>Descripción</th>
              <th>Tipo Recurso</th>
              <th>Cob.MinFecha</th>
              <th>Cob.MaxFecha</th>
              <th>Cob.Lugares</th>
              <th>Cob.Lon</th>
              <th>Cob.Lat</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody >
            { this.recursoList() }
          </tbody>
        </table>
      </div>
    )
  }
}