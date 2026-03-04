'use strict'

var express = require('express');
var CuentasControllers = require('../controllers/controlador-cuentas');
var LibroGeneralControllers = require('../controllers/controler-libro-general');
var ControlDineroController = require('../controllers/controler-control-dinero');
var GastoFamiliaController = require('../controllers/controler-gasto-familia');
var DeudasController = require('../controllers/controller-deudas');
var AuthController = require('../controllers/auth');
const md_auth = require('../middlewares/authenticated');

var router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/profile', md_auth.ensureAuth, AuthController.profile);

router.get('/home', CuentasControllers.home);
router.get('/test', CuentasControllers.test);
router.post('/saveMovimientoDia', CuentasControllers.saveMovimientoDia);
router.get('/getMovimientosDia', CuentasControllers.getMovimientosDia);
router.post('/saveLibroGeneral', LibroGeneralControllers.saveLibroGeneral);
router.get('/getLibroGeneral', LibroGeneralControllers.getLibroGeneral);
router.post('/saveSalidaCaja', ControlDineroController.saveSalidaCaja);
router.get('/getControlDinero', ControlDineroController.getControlDinero);
router.post('/saveAdicionBase', ControlDineroController.saveAdicionBase);
router.post('/saveGastoFamilia', GastoFamiliaController.saveGastoFamilia);
router.get('/getGastos', GastoFamiliaController.getGastos);
router.post('/saveDeuda', DeudasController.saveDeuda);
router.post('/saveEntidad', DeudasController.saveEntidad);
router.get('/getEntidades', DeudasController.getEntidades);
router.get('/getDeudas', DeudasController.getDeudas);
router.post('/savePago', DeudasController.savePago);
router.get('/getPagosEntidad:consecutivoEntidad', DeudasController.getPagosEntidad);
router.get('/getPagos', DeudasController.getPagos);
router.post('/savePagoCd', ControlDineroController.savePagoCd);
router.post('/saveRegistroCd', ControlDineroController.saveRegistroCd);
router.delete('/deleteGasto', GastoFamiliaController.deleteGasto);
router.delete('/deleteControlDinero/:idFuente', ControlDineroController.deleteControlDinero);
router.delete('/deletePagos', DeudasController.deletePagos);
router.delete('/deleteDeudas/:idDeuda', DeudasController.deleteDeudas);


module.exports = router;