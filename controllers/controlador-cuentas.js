'use strict'

var movimientoDia = require('../models/model-movimiento-diario');

var libroGeneral = require('../models/models-libroGeneral');

var controller = {

	home:function(req, res){
		return res.status(200).send({
			message: 'Soy la home'
		});
	},

	test:function(req, res){
		return res.status(200).send({
			message: 'Soy el metodo test del controlador cuentas'
		});
	},

	saveMovimientoDia: async function(req,res){
			try{

	        var params = req.body;

	        console.log("BODY QUE LLEGA:", params);

	        var modelmovimientoDia = new movimientoDia({
	            fecha: params.fecha,
	            baseInicial : params.baseInicial,
	            totalGastos: params.totalGastos,
	            totalVentas: params.totalVentas,
	            salidas: params.salidas,
	            efectivoCierre: params.efectivoCierre,
	            baseSigDia: params.baseSigDia,
	            balance: params.balance,
	            descuadre: params.descuadre,
	            adicionBaseactual: params.adicionBaseactual
	        });

	        console.log("ANTES DE GUARDAR");

	        const movimientoDiaStored = await modelmovimientoDia.save();

	        console.log("DESPUÉS DE GUARDAR:", movimientoDiaStored);

	        return res.status(200).send({
	            movimiento: movimientoDiaStored
	        });

	    }catch(err){

	        console.log("ERROR:", err);

	        return res.status(500).send({
	            message: 'Error al guardar',
	            error: err.message
	        });
	    }
	},



	getMovimientosDia: async function(req, res) {

	    try {

	        const movimientosDia = await movimientoDia
	            .find({})
	            .sort({ fecha: -1 });  // últimos primero

	        if (movimientosDia.length === 0) {
	            return res.status(404).send({
	                message: "No hay movimientos para mostrar"
	            });
	        }

	        return res.status(200).send({
	            movimientosDia
	        });

	    } catch (err) {

	        console.log("ERROR GET MOVIMIENTOS:", err);

	        return res.status(500).send({
	            message: "Error al devolver los datos",
	            error: err.message
	        });
	    }
	},


};

module.exports = controller;