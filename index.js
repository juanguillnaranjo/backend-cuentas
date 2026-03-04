'use strict'
require('dotenv').config();
var mongoose = require('mongoose');
var app = require('./app.js');
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/CuentasOrange')
	.then(()=>{
		console.log("conexion establecida con exito");

		//creacion del servidor

		//cracion del servidor
	  app.listen(port, '0.0.0.0',()=>{
	    console.log("Servidor corriendo correctamente en la url: Localhost 3700");
	  });

	})
	.catch(err=>console.log(err));

const mysql = require('mysql2');



// Crear conexión
const connection = mysql.createConnection({
  host: 'appiorange.com',
  user: 'appioran_juangui009',
  password: 'Juangui123/', // tu contraseña
  database: 'appioran_BdOrange',
  port: 3306
});

// Conectar
connection.connect((err) => {
  if (err) {
    console.error('Error conectando:', err);
    return;
  }
  console.log('Conectado a MySQL');


});

module.exports = connection;