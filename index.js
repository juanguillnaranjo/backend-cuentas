'use strict'
require('dotenv').config();
var mongoose = require('mongoose');
var app = require('./app.js');

var port = process.env.PORT || 1000;

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
	console.log("✅ Conexión establecida con MongoDB Atlas");
	
	app.listen(port, '0.0.0.0', () => {
	  console.log("🚀 Servidor corriendo en puerto " + port);
	});
})
.catch(err => {
	console.error('❌ Error de MongoDB Atlas:', err);
});


