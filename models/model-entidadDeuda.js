'use strict'

var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var EntidadSchema = Schema({
  consecutivoEntidad: Number,
  nombre: String

});

module.exports = mongoose.model('Entidades', EntidadSchema);