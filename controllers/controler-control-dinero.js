'use strict'

var movimientoDia = require('../models/model-movimiento-diario');

var libroGeneral = require('../models/models-libroGeneral');

var controlDinero = require('../models/model-controlDinero');

var gastoFamilia = require('../models/model-gastoFamilia');

var salidaCaja = require('../models/model-salidaCaja');

var adicionBase = require('../models/model-adicionBase');

const mongoose = require('mongoose');



// 🔁 FUNCIÓN REUTILIZABLE (NO usa req/res)
async function registrarEnControlDinero({
    idFuente,
    origenModelo,
    fecha,
    efectivo,
    transferencia,
    descripcionAdicionBase
}) {

    // 🔎 Buscar último registro
    const ultimoRegistro = await controlDinero
        .findOne({})
        .sort({ consecutivo: -1, _id: -1 });

    let consecutivo = 1;

    if (ultimoRegistro) {
        consecutivo = Number(ultimoRegistro.consecutivo + 1) || 1;
    }

    // 🧮 calcular salida
    const adicionBase =
        Number(efectivo || 0) +
        Number(transferencia || 0);

    const movimiento = new controlDinero({
        idFuente,
        origenModelo,
        fecha,
        efectivo: efectivo * -1,
        transferencia: transferencia * -1,
        adicionBase,
        descripcionAdicionBase,
        consecutivo
    });

    return await movimiento.save();
}



var controller = {

	saveSalidaCaja: async function(req,res){
			try{

	        var params = req.body;

	        console.log("BODY QUE LLEGA:", params);

	          // 🔎 1. Buscar el último registro guardado
	        const ultimoRegistro = await salidaCaja
	            .findOne({})
	            .sort({ consecutivo: -1, _id: -1 }); // trae el más reciente


	    	let consecutivo = 0;
	        let saldoAnterior = 0;

	        if(ultimoRegistro){
	            saldoAnterior = ultimoRegistro.saldo || 0;
	            consecutivo = ultimoRegistro.consecutivo  + 1;

	        }

        	// 🧮 2. Calcular nuevo saldo
	        const totalIngreso =
	            Number(params.efectivo || 0) +
	            Number(params.transferencia || 0);

	        const nuevoSaldo = saldoAnterior + totalIngreso;


	        var modelSalidaCajao = new salidaCaja({
	            fecha: params.fecha,
	            efectivo: params.efectivo*-1,
	            transferencia: params.transferencia*-1,
	            totalSalida: totalIngreso,
	            detalleSalida: "Retiro caja Orange",
	            consecutivo: consecutivo
	        });

	        console.log("ANTES DE GUARDAR");

	        const salidaCajaStored = await modelSalidaCajao.save();

	        // 🔁 Registrar automáticamente en ControlDinero
			await registrarEnControlDinero({
			    idFuente: salidaCajaStored._id,
			    origenModelo: 'salidascaja',   // ← importante que coincida con el enum
			    fecha: salidaCajaStored.fecha,
			    efectivo: salidaCajaStored.efectivo,
			    transferencia: salidaCajaStored.transferencia,
			    descripcionAdicionBase: salidaCajaStored.detalleSalida
			});

	        console.log("DESPUÉS DE GUARDAR:", salidaCajaStored);

	        return res.status(200).send({
	            salidaCajaDia: salidaCajaStored
	        });

	    }catch(err){

	        console.log("ERROR:", err);

	        return res.status(500).send({
	            message: 'Error al guardar',
	            error: err.message
	        });
	    }
	},



	saveAdicionBase: async function(req,res){
			try{

	        var params = req.body;

	        console.log("BODY QUE LLEGA:", params);

	          // 🔎 1. Buscar el último registro guardado
	        const ultimoRegistro = await adicionBase
	            .findOne({})
	            .sort({ consecutivo: -1, _id: -1 }); // trae el más reciente

	        let consecutivo = 0;
	        

	        if(ultimoRegistro){
	            
	            consecutivo = ultimoRegistro.consecutivo  + 1;

	        }

        	// 🧮 2. Calcular nuevo saldo
	        const totaladicionBase =
	            Number(params.efectivo || 0) +
	            Number(params.transferencia || 0);

	        const efectivo = params.efectivo;
	        const transferencia = params.transferencia;

	        var modelAdicionBase = new adicionBase({
	        	consecutivo: consecutivo,
	            fecha: params.fecha,
	            efectivo: efectivo,
	            transferencia: transferencia,
	            totalAdicion: totaladicionBase,
	            detalleAdicion: params.descripcionAdicionBase,
	        });

	        console.log("ANTES DE GUARDAR: ", modelAdicionBase);

	        const adicionBaseStored= await modelAdicionBase.save();

	        // 🔁 Registrar automáticamente en ControlDinero
			await registrarEnControlDinero({
			    idFuente: adicionBaseStored._id,
			    origenModelo: 'adicionbase',   // ← importante que coincida con el enum
			    fecha: adicionBaseStored.fecha,
			    efectivo: adicionBaseStored.efectivo,
			    transferencia: adicionBaseStored.transferencia,
			    descripcionAdicionBase: adicionBaseStored.detalleAdicion
			});

	        console.log("DESPUÉS DE GUARDAR:", adicionBaseStored);

	        return res.status(200).send({
	            adicionBaseDia: adicionBaseStored
	        });

	    }catch(err){

	        console.log("ERROR:", err);

	        return res.status(500).send({
	            message: 'Error al guardar',
	            error: err.message
	        });
	    }
	},


	saveRegistroCd: async function(req, res){

		var params = req.body;

	    console.log("BODY QUE LLEGA:", params);

	     
     // 🔁 Registrar automáticamente en ControlDinero
		await registrarEnControlDinero({
		    idFuente: params.idFuente,
		    origenModelo: params.origenModelo,   // ← importante que coincida con el enum
		    fecha: params.fecha,
		    efectivo: params.efectivo,
		    transferencia: params.transferencia,
		    descripcionAdicionBase: params.descripcionAdicionBase
		});


	},



	savePagoCd: async function(req, res){

		var params = req.body;

	    console.log("BODY QUE LLEGA:", params);

	     
     // 🔁 Registrar automáticamente en ControlDinero
		await registrarEnControlDinero({
		    idFuente: params.idFuente,
		    origenModelo: params.origenModelo,   // ← importante que coincida con el enum
		    fecha: params.fecha,
		    efectivo: params.efectivo,
		    transferencia: params.transferencia,
		    descripcionAdicionBase: params.descripcionAdicionBase
		});


	},




	getControlDinero: async function(req, res) {

	    try {

	        const movimientos = await controlDinero
	            .find({})
	            .sort({ fecha: 1, _id: 1 }); // orden cronológico

	        if (movimientos.length === 0) {
	            return res.status(404).send({
	                message: "No hay registros para mostrar en Control Dinero"
	            });
	        }

	        //CALCULA SALDO DINAMICO
	        let saldoAcumulado = 0;

	        const movimientosConSaldo = movimientos.map(mov => {

	            const totalMovimiento =
	                (Number(mov.efectivo) || 0) +
	                (Number(mov.transferencia) || 0);

	            saldoAcumulado += totalMovimiento;

	            return {
	                ...mov.toObject(),
	                saldo: saldoAcumulado
	            };
	        });

	        return res.status(200).send({
	        	ControlDineroDia: movimientosConSaldo
	        });

	    } catch (err) {

	        console.log("ERROR GET Libro General:", err);

	        return res.status(500).send({
	            message: "Error al devolver los datos libro general",
	            error: err.message
	        });
	    }
	},


	

	deleteControlDinero: async function(req, res){
		try{

			const idFuente = req.params.idFuente;

			console.log("ID Fuente recibido:", idFuente);

			// ✅ Validar ObjectId antes de consultar (MUY importante)
			if (!mongoose.Types.ObjectId.isValid(idFuente)) {
				return res.status(400).send({
					message: "idFuente inválido"
				});
			}

			// 🔎 Buscar y eliminar el movimiento ligado a ese documento
			const registroEliminado = await controlDinero.findOneAndDelete({
				idFuente: idFuente
			});

			if (!registroEliminado) {
				return res.status(404).send({
					message: "No se encontró registro en ControlDinero"
				});
			}

			return res.status(200).send({
				message: "Registro de ControlDinero eliminado",
				registroEliminado
			});

		}catch (err){

			console.log("Error deleteControlDinero:", err);

			return res.status(500).send({
				message: "Error al eliminar en ControlDinero",
				error: err.message
			});
		}
	}



	





};

module.exports = controller;
