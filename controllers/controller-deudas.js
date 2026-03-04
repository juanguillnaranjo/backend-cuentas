'use strict'

var deuda = require('../models/model-Deudas');
var entidad = require('../models/model-entidadDeuda');
var pago = require('../models/model-PagosDeuda');


var controller = {

	saveDeuda: async function(req,res){
		try{

        var params = req.body;

        console.log("BODY QUE LLEGA:", params);

     	const ultimoRegistro = await deuda
            .findOne({})
            .sort({ consecutivo: -1, _id: -1 }); // trae el más reciente


    	let consecutivo = 0;
        
        if(ultimoRegistro){
            consecutivo = ultimoRegistro.consecutivo  + 1;

        }

        var modelDeuda = new deuda({
        	consecutivo:consecutivo,
        	consecutivoEntidad:params.consecutivoEntidad,
        	factura: params.factura,
            fecha: params.fecha,
            detalle: params.detalle,
            valor: params.valor,
            
        });

        console.log("ANTES DE GUARDAR");

        const deudaStered = await modelDeuda.save();

        console.log("DESPUÉS DE GUARDAR:", deudaStered);

        return res.status(200).send({
            deuda: deudaStered
        });

	    }catch(err){

	        console.log("ERROR:", err);

	        return res.status(500).send({
	            message: 'Error al guardar',
	            error: err.message
	        });
	    }
	},



	saveEntidad: async function(req,res){
		try{

        var params = req.body;

        console.log("BODY QUE LLEGA:", params);

     	const ultimoRegistro = await entidad
            .findOne({})
            .sort({ consecutivoEntidad: -1, _id: -1 }); // trae el más reciente


    	let consecutivoEntidad = 0;
        
        if(ultimoRegistro){
            consecutivoEntidad = ultimoRegistro.consecutivoEntidad  + 1;

        }

        var modelEntidad = new entidad({
        	consecutivoEntidad: consecutivoEntidad,
        	nombre: params.nombre,
        });

        console.log("ANTES DE GUARDAR");

        const entidadStered = await modelEntidad.save();

        console.log("DESPUÉS DE GUARDAR:", entidadStered);

        return res.status(200).send({
            entidad: entidadStered
        });

	    }catch(err){

	        console.log("ERROR:", err);

	        return res.status(500).send({
	            message: 'Error al guardar',
	            error: err.message
	        });
	    }
	},


	getEntidades: async function(req, res) {

	    try {

	        const entidaditem = await entidad
	            .find({})
	            .sort({ consecutivoEntidad: -1 });  // últimos primero

	        if (entidaditem.length === 0) {
	            return res.status(404).send({
	                message: "No hay registros para mostrar en Gastos familia Orange"
	            });
	        }

	        return res.status(200).send({
	            entidaditem
	        });

	    } catch (err) {

	        console.log("ERROR GET Libro General:", err);

	        return res.status(500).send({
	            message: "Error al devolver los datos libro general",
	            error: err.message
	        });
	    }
	},



	getDeudas: async function(req, res) {

	    try {

	        const deudas = await deuda
	            .find({})
	            .sort({ consecutivo: -1 });  // últimos primero

	        if (deudas.length === 0) {
	            return res.status(404).send({
	                message: "No hay registros para mostrar en Gastos familia Orange"
	            });
	        }

	        return res.status(200).send({
	            deudas
	        });

	    } catch (err) {

	        console.log("ERROR GET Libro General:", err);

	        return res.status(500).send({
	            message: "Error al devolver los datos libro general",
	            error: err.message
	        });
	    }
	},


	
	savePago: async function(req, res) {
	  try {

	    const params = req.body;

	    // 🔢 generar consecutivo del pago
	    const ultimoPago = await pago
	      .findOne({})
	      .sort({ consecutivo: -1, _id: -1 });

	    let consecutivo = 0;

	    if (ultimoPago) {
	      consecutivo = ultimoPago.consecutivo + 1;
	    }

	    const nuevoPago = new pago({
	      consecutivo: consecutivo,
	      consecutivoEntidad: params.consecutivoEntidad,
	      fecha: params.fecha,
	      valor: params.valor,
	      detalle: params.detalle
	    });

	    const pagoGuardado = await nuevoPago.save();

	    return res.status(200).send({
	      pago: pagoGuardado
	    });

	  } catch (err) {

	    console.log("ERROR SAVE PAGO:", err);

	    return res.status(500).send({
	      message: 'Error al registrar el pago',
	      error: err.message
	    });
	  }
	},


	getPagosEntidad: async function(req, res) {
	  try {
    

	    const consecutivoEntidad = Number(req.query.consecutivoEntidad);

	    console.log("consecutivo entidad " + consecutivoEntidad);

	    const pagos = await pago
	      .find({ consecutivoEntidad: consecutivoEntidad })
	      .sort({ consecutivo: -1 });

	    return res.status(200).send({ pagos });

	  } catch (err) {

	    console.log("ERROR GET PAGOS:", err);

	    return res.status(500).send({
	      message: 'Error al obtener pagos',
	      error: err.message
	    });
	  }
	},


	getPagos: async (req,res)=>{

	  const pagos = await pago.find();

	  return res.status(200).send({
	    pagos
	  });

	},


	deletePagos: async (req, res) =>{
		try{

			var params = req.query.pago;
			var idPago = params;
			console.log("estou en pagos ", params);

			const pagoEliminado = await pago.findByIdAndDelete(idPago);

			if (!pagoEliminado) {
				return res.status(404).send({
					message: "No se encontró gasto para eliminar en collection pagos"
				});
			}

			return res.status(200).send({

				message: "Gasto eliminado correctamente el pago de la collection pagos",
				pagoEliminado: pagoEliminado

			});
			
		} catch (err) {
			console.log("error al borrar pago en mongo en la collectio pagos");

			return res.status(500).send({
				message: "error al borrar pago de la collection pagos",
				error: err.message
			});
		}
		
		
	},


	deleteDeudas: async (req, res) =>{
		try{

			var idDeuda = req.params.idDeuda;
			console.log("estou en deudas ", idDeuda);

			const deudaElimininada = await deuda.findByIdAndDelete(idDeuda);

			if (!deudaElimininada) {
				return res.status(404).send({
					message: "No se encontró deuda para eliminar en collection deudas",
					idDeuda: IdDeuda
				});
			}

			return res.status(200).send({

				message: "deuda eliminada correctamente  de la collection deudas",
				deudaElimininada: deudaElimininada

			});
			
		} catch (err) {
			console.log("error al borrar deuda en mongo en la collectio deudas");

			return res.status(500).send({
				message: "error al borrar deuda de la collection deudas",
				error: err.message
			});
		}
		
		
	}









};

module.exports = controller;