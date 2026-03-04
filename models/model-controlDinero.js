'use strict'

var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var ControlDineroSchema = Schema({
  idFuente: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'origenModelo'
  },
  origenModelo: {
    type: String,
    required: true,
    enum: ['gastofamilias', 'pagos', 'salidascaja', 'adicionbase'] // ← modelos válidos
  },
  consecutivo: Number,
  fecha: { type: String, required: true },
  efectivo : Number,
  transferencia: Number,
  adicionBase: Number,
  descripcionAdicionBase: String
});

module.exports = mongoose.model('controldineros', ControlDineroSchema);