'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PagoSchema = Schema({
  consecutivo: { type: Number, required: true },
  consecutivoEntidad: {
    type: Number,
    required: true,
    set: v => {
      const n = Number(v);
      if (isNaN(n)) throw new Error("consecutivoEntidad debe ser un número");
      return n;
    }
  },
  fecha: { type: String, required: true },
  valor: { type: Number, required: true },
  detalle: String
});

module.exports = mongoose.model('pagos', PagoSchema);