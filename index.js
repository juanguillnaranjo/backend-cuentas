'use strict'
require('dotenv').config();
var mongoose = require('mongoose');
var app = require('./app.js');
var port = 1000;

mongoose.Promise = global.Promise;
mongoose.connect('process.env.MONGODB_URI')
	.then(()=>{
		console.log("conexion establecida con exito");

		//creacion del servidor
	app.listen(port, '0.0.0.0',()=>{
	    console.log("Servidor corriendo correctamente e, eso espero");
	  })
		
	.catch(err => console.error('MongoDB Atlas error:', err));

});

module.exports = connection;
