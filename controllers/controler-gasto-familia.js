'use strict'

var movimientoDia = require('../models/model-movimiento-diario');

var libroGeneral = require('../models/models-libroGeneral');

var controlDinero = require('../models/model-controlDinero');

var gastoFamilia = require('../models/model-gastoFamilia');

var controller = {

	saveGastoFamilia: async function(req,res){
		try{

        var params = req.body;

        console.log("BODY QUE LLEGA:", params);

        var modelGastoFamilia = new gastoFamilia({
            fecha: params.fecha,
            categoria: params.categoria,
            detalle: params.detalle,
            efectivo: params.efectivo,
            transferencia: params.transferencia,
            totalGasto: params.totalGasto
        });

        console.log("ANTES DE GUARDAR");

        const gastoFamiliaStored = await modelGastoFamilia.save();

        console.log("DESPUÉS DE GUARDAR:", gastoFamiliaStored);

        return res.status(200).send({
            gastoFamiliaDia: gastoFamiliaStored
        });

	    }catch(err){

	        console.log("ERROR:", err);

	        return res.status(500).send({
	            message: 'Error al guardar',
	            error: err.message
	        });
	    }
	},


	getGastos: async function(req, res) {

	    try {

	        const gastoFamiliaDia = await gastoFamilia
	            .find({})
	            .sort({ fecha: -1 });  // últimos primero

	        if (gastoFamiliaDia.length === 0) {
	            return res.status(404).send({
	                message: "No hay registros para mostrar en Gastos familia Orange"
	            });
	        }

	        return res.status(200).send({
	            gastoFamiliaDia
	        });

	    } catch (err) {

	        console.log("ERROR GET Libro General:", err);

	        return res.status(500).send({
	            message: "Error al devolver los datos libro general",
	            error: err.message
	        });
	    }
	},


	deleteGasto: async function(req, res){
		try{

			var params = req.query.gasto;
			var idGasto = params;

			console.log("El Body que llega: ", params);

			const gastoEliminado = await gastoFamilia.findByIdAndDelete(idGasto);
			if (!gastoEliminado) {
				return res.status(404).send({
					message: "No se encontró gasto"
				});
			}

			return res.status(200).send({

				message: "Gasto eliminado correctamente",
    			gastoEliminado: gastoEliminado

			});


		} catch (err) {
			console.log("error al borrar gasto en mongo");

			return res.status(500).send({
				message: "error al borrar gasto",
				error: err.message
			});
		}

	}




};

module.exports = controller;