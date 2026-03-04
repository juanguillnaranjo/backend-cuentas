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

		//cracion del servidor
	  	app.listen(PORT, () => {
		  console.log(`Backend corriendo en web server en puerto ${PORT}`);
		});


	})
	.catch(err => console.error('MongoDB Atlas error:', err));

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
