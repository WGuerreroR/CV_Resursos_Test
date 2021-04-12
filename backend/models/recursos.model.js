const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pointSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  });


  const rangoFechaSchema = new mongoose.Schema({
    min_fecha: { type: Date} ,max_fecha: { type: Date} 
  });

const recursoSchema = new Schema({
  titulo: { type: String, required: true },
  claves: { type: Array, required: true },
  descripcion: { type: String, required: true },
  fuente: { type: String, required: true },
  tipo_recurso: { type: String, required: true,  enum: ['Testimonio','Informe', 'Caso'] },
  cobertura: { localizacion: pointSchema, rangoFecha: rangoFechaSchema, lugares: { type: Array }},
}, {
  timestamps: true,
});

const Recurso = mongoose.model('Recurso', recursoSchema);

module.exports = Recurso;