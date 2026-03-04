'use strict'

var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var LibroGeneralSchema = Schema({

  fecha: { type: String, required: true },
  debito : Number,
  credito: Number,
  descripcion: String
});

module.exports = mongoose.model('libroGenerals', LibroGeneralSchema);