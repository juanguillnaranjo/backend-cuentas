'use strict'

var libroGeneral = require('../models/models-libroGeneral');

var controller = {

	saveLibroGeneral: async function(req,res){
		try{

        var params = req.body;

	        console.log("BODY QUE LLEGA:", params);

	        var modelLibroGeneral = new libroGeneral({
	            fecha: params.fecha,
	            debito : Number(params.debito) || 0,
		        credito: Number(params.credito) || 0,
		        descripcion: params.descripcion || ""
	        });

	        console.log("ANTES DE GUARDAR");

	        const libroGeneralStored = await modelLibroGeneral.save();

	        console.log("DESPUÉS DE GUARDAR:", libroGeneralStored);

	        return res.status(200).send({
	            libroGeneral: libroGeneralStored
	        });

	    }catch(err){

	        console.log("ERROR:", err);

	        return res.status(500).send({
	            message: 'Error al guardar libro general',
	            error: err.message
	        });
	    }
	},


	getLibroGeneral: async function(req, res) {

	    try {

	        const movimientos  = await libroGeneral
	            .find({})
	            .sort({ fecha: -1 });  // últimos primero

	        if (movimientos .length === 0) {
	            return res.status(404).send({
	                message: "No hay registros para mostrar en libro general"
	            });
	        }

	        let saldoAcumulado = 0;

	        const movimientosConSaldo = movimientos.map(mov => {

		        saldoAcumulado += 
		          (Number(mov.credito) || 0) -
		          (Number(mov.debito) || 0);

		        return {
		          ...mov.toObject(),
		          saldo: saldoAcumulado  // 👈 saldo calculado dinámicamente
		        };

	    	});

	        return res.status(200).send({
	            LibroGneralDia: movimientosConSaldo
	        });

	    } catch (err) {

	        console.log("ERROR GET Libro General:", err);

	        return res.status(500).send({
	            message: "Error al devolver los datos libro general",
	            error: err.message
	        });
	    }
	}



};

module.exports = controller;