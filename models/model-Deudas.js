'use strict'

var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var DeudaSchema = Schema({
  consecutivo: Number,
  consecutivoEntidad: Number,
  factura:Number,
  fecha:{ type: String, required: true },
  detalle: String,
  valor: Number

});

module.exports = mongoose.model('deudas', DeudaSchema);