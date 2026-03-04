'use strict'

var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var GastoFamiliaSchema = Schema({
  fecha: { type: String, required: true },
  categoria: String,
  detalle: String,
  efectivo : Number,
  transferencia: Number,
  totalGasto: Number
});

module.exports = mongoose.model('gastofamilias', GastoFamiliaSchema);