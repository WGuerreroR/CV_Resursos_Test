import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class CrearRecurso extends Component{
  

    constructor(props) {
      super(props);
  
      this.onChangeTitulo = this.onChangeTitulo.bind(this);
      this.onChangeClaves = this.onChangeClaves.bind(this);
      this.onChangeDescripcion = this.onChangeDescripcion.bind(this);
      this.onChangeTipoRecurso = this.onChangeTipoRecurso.bind(this);
      this.onChangeCoberturaLocalizacionLon = this.onChangeCoberturaLocalizacionLon.bind(this);
      this.onChangeCoberturaLocalizacionLat = this.onChangeCoberturaLocalizacionLat.bind(this);
      this.onChangeCoberturaMinFecha = this.onChangeCoberturaMinFecha.bind(this);
      this.onChangeCoberturaMaxFecha = this.onChangeCoberturaMaxFecha.bind(this);
      this.onChangeCoberturaLugares = this.onChangeCoberturaLugares.bind(this);  
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
        titulo: '',
        claves: '',
        descripcion: '',
        tipo_recurso:'Testimonio',
        cobertura_localizacion_lon:-74.0,
        cobertura_localizacion_lat:4.0,
        cobertura_min_fecha:new Date(),
        cobertura_max_fecha:new Date(),
        cobertura_lugares:''       
      }
    }
  
   
   componentDidMount() {
       
    }
  
    onChangeTitulo(e) {
      this.setState({
        titulo: e.target.value
      })
    }
    onChangeClaves(e) {
        this.setState({
            claves: e.target.value
        })
      }
    
    onChangeDescripcion(e) {
        this.setState({
          descripcion: e.target.value
        })
      }
    
    onChangeTipoRecurso(e) {
      this.setState({
        tipo_recurso: e.target.value
      })
    }

    onChangeCoberturaLocalizacionLon(e) {
        this.setState({
            cobertura_localizacion_lon: e.target.value
        })
      }

    onChangeCoberturaLocalizacionLat(e) {
        this.setState({
            cobertura_localizacion_lat: e.target.value
        })
    }

    onChangeCoberturaMinFecha(date) {
        this.setState({
            cobertura_min_fecha: date
        })
    }

    onChangeCoberturaMaxFecha(date) {
        this.setState({
            cobertura_max_fecha: date
        })
    }

    onChangeCoberturaLugares(e) {
        this.setState({
            cobertura_lugares: e.target.value
        })
    }


    onSubmit(e) {
        
    e.preventDefault();
  
      const recurso = {
        titulo: this.state.titulo,
        claves: this.state.claves,
        descripcion: this.state.descripcion,
        tipo_recurso: this.state.tipo_recurso,
        cobertura_localizacion_lon: this.state.cobertura_localizacion_lon,
        cobertura_localizacion_lat: this.state.cobertura_localizacion_lat,
        cobertura_min_fecha: this.state.cobertura_min_fecha,
        cobertura_max_fecha: this.state.cobertura_max_fecha,
        cobertura_lugares: this.state.cobertura_lugares,
      }
  
     console.log(recurso);
  
     axios.post('http://localhost:5000/recursos/add', recurso)
        .then(res => console.log(res.data));
       alert("Se creo el recurso satisfactoriamente");
       toast("Se creo el recurso satisfactoriamente");
      window.location = '/';

      
    }
  
    render() {
      return (
      <div className="container">
        <h3>Crear nuevo registro</h3>
        <form onSubmit={this.onSubmit}>
          
          <div className="form-group"> 
            <label>Titulo: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.titulo}
                onChange={this.onChangeTitulo}
                />
          </div>
          <div className="form-group"> 
            <label>Claves (escribir valores separada por comas): </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.claves}
                onChange={this.onChangeClaves}
                />
          </div>
          <div className="form-group"> 
            <label>Descripción: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.descripcion}
                onChange={this.onChangeDescripcion}
                />
          </div>
      
          <div className="form-group"> 
            <label>Tipo recurso: </label>
       
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.tipo_recurso}
                onChange={this.onChangeTipoRecurso}>
                     <option value="Testimonio">Testimonio</option>
                     <option value="Informe">Informe</option>
                     <option value="Caso">Caso</option>
            </select>
          </div>

          <div class="row">
             <div class="col-sm">
            <div className="form-group"> 
                <label>Cobertura localizacion lon: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.cobertura_localizacion_lon}
                    onChange={this.onChangeCoberturaLocalizacionLon}
                    />
            </div>
            </div>
            <div class="col-sm">
            <div className="form-group"> 
                <label>Cobertura localizacion lat: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.cobertura_localizacion_lat}
                    onChange={this.onChangeCoberturaLocalizacionLat}
                    />
                    </div>
            </div>
          </div>
          <div class="row">
             <div class="col-sm">
                <div className="form-group">
                    <label>Cobertura fecha inicial: </label>
                    <div>
                    <DatePicker
                        selected={this.state.cobertura_min_fecha}
                        onChange={this.onChangeCoberturaMinFecha}
                    />
                    </div>
                </div>
            </div>
            

            <div class="col-sm">
                <div className="form-group">
                    <label>Cobertura fecha final: </label>
                    <div>
                    <DatePicker
                        selected={this.state.cobertura_max_fecha}
                        onChange={this.onChangeCoberturaMaxFecha}
                    />
                    </div>
                    </div>
            </div>
          </div>
          <div className="form-group"> 
            <label>Cobertura lugares (escribir lugares separada por comas): </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.cobertura_lugares}
                onChange={this.onChangeCoberturaLugares}
                />
          </div>

  
          <div className="form-group">
            <input type="submit" value="Crear recurso" className="btn btn-primary" />
          </div>
        </form>
        <ToastContainer />
      </div>
      )
    }
  }