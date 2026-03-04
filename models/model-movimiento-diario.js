'use strict'

var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var MovimientoDiarioSchema = Schema({

	fecha: { type: String, required: true },
	baseInicial : Number,
	totalGastos: Number,
	totalVentas: Number,
	salidas: Number,
	efectivoCierre: Number,
	baseSigDia: Number,
	balance: Number,
	descuadre: Number,
	adicionBaseactual: Number

});

module.exports = mongoose.model('movimientoDiario', MovimientoDiarioSchema);
