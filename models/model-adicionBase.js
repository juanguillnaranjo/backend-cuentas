'use strict'

var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var AdicionBaseSchema = Schema({
  consecutivo: Number,
  fecha: { type: String, required: true },
  efectivo : Number,
  transferencia: Number,
  totalAdicion: Number,
  detalleAdicion: String
});

module.exports = mongoose.model('adicionbase', AdicionBaseSchema);