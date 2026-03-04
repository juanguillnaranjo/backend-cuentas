'use strict'

var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var SalidasCajaSchema = Schema({
  consecutivo: Number,
  fecha: { type: String, required: true },
  efectivo : Number,
  transferencia: Number,
  totalSalida: Number,
  detalleSalida: String
});

module.exports = mongoose.model('salidascaja', SalidasCajaSchema);