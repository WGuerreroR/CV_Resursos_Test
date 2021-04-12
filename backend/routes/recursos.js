const router = require('express').Router();
const Recurso = require('../models/recursos.model');
let recurso = require('../models/recursos.model');

router.route('/').get((req, res) => {
  Recurso.find()
    .then(recursos => res.json(recursos))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

  const titulo_str = req.body.titulo;
  const strClaves= req.body.claves;  
  const claves_array = strClaves.split(",");
  const descripcion_str = req.body.descripcion;

  const fuente_funct = require('uniqid'); 
  const tipo_recurso_str = req.body.tipo_recurso;

  let oCobertura =  {}
//Construyendo ojeto cobertura
  if(req.body.cobertura_localizacion_lon!="" &&  req.body.cobertura_localizacion_lat!=""){
    const cobertura_localizacion_lon =  Number(req.body.cobertura_localizacion_lon);
    const cobertura_localizacion_lat =  Number(req.body.cobertura_localizacion_lat);
    const point = {
      type: 'Point',
      coordinates: [cobertura_localizacion_lon, cobertura_localizacion_lat]
    };
    oCobertura["localizacion"]=point;
  }

  if(req.body.cobertura_min_fecha!="" &&  req.body.cobertura_max_fecha!=""){
    const cobertura_min_fecha =  Date.parse(req.body.cobertura_min_fecha);
    const cobertura_max_fecha =  Date.parse(req.body.cobertura_max_fecha);
    const oRangofecha = {
      min_fecha:cobertura_min_fecha,
      max_fecha:cobertura_max_fecha 
    };
  
    oCobertura["rangoFecha"]=oRangofecha;
  }
  if(req.body.cobertura_lugares!="" ){
    const strlugares = req.body.cobertura_lugares;  
    const lugares_array = strlugares.split(",");
    oCobertura["lugares"]=lugares_array;
  }


  const nuevoRecurso  = new Recurso({
    titulo: titulo_str,
    claves:claves_array,
    descripcion:descripcion_str,
    fuente:fuente_funct(),
    tipo_recurso:tipo_recurso_str,
    cobertura: oCobertura
  });

  nuevoRecurso.save()
  .then(() => res.json('Recurso adicionado!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Recurso.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Recurso.findByIdAndDelete(req.params.id)
    .then(() => res.json('Recurso borrado.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Recurso.findById(req.params.id)
    .then(recurso => {
            
        const titulo_str = req.body.titulo;
        const strClaves= req.body.claves;  
        const claves_array = strClaves.split(",");
        const descripcion_str = req.body.descripcion;
        const tipo_recurso_str = req.body.tipo_recurso;
        let oCobertura =  {}
      //Construyendo ojeto cobertura
        if(req.body.cobertura_localizacion_lon!="" &&  req.body.cobertura_localizacion_lat!=""){
          const cobertura_localizacion_lon =  Number(req.body.cobertura_localizacion_lon);
          const cobertura_localizacion_lat =  Number(req.body.cobertura_localizacion_lat);
          const point = {
            type: 'Point',
            coordinates: [cobertura_localizacion_lon, cobertura_localizacion_lat]
          };
          oCobertura["localizacion"]=point;
        }

        if(req.body.cobertura_min_fecha!="" &&  req.body.cobertura_max_fecha!=""){
          const cobertura_min_fecha =  Date.parse(req.body.cobertura_min_fecha);
          const cobertura_max_fecha =  Date.parse(req.body.cobertura_max_fecha);
          const oRangofecha = {
            min_fecha:cobertura_min_fecha,
            max_fecha:cobertura_max_fecha 
          };
        
          oCobertura["rangoFecha"]=oRangofecha;
        }
        if(req.body.cobertura_lugares!="" ){
          const strlugares = req.body.cobertura_lugares;  
          const lugares_array = strlugares.split(",");
          oCobertura["lugares"]=lugares_array;
        }

        recurso.titulo = titulo_str;
        recurso.claves = claves_array;
        recurso.descripcion=descripcion_str;     
        recurso.tipo_recurso = tipo_recurso_str;
        recurso.cobertura = oCobertura;
        recurso.save()
        .then(() => res.json('Recurso actualizado!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;