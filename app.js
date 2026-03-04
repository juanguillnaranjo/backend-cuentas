'use strict'

var express = require('express');
const mongoose = require('mongoose');  // <--- Esto faltaba
var cors = require('cors');   // ← importar así


var app = express();


// activar CORS
app.use(cors());              // ← aquí se ejecuta
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Servidor activo ojala!');
});

// cargar rutas
var cuentas_routes = require('./routes/routes-cuentas');

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rutas
app.use('/api', cuentas_routes);


module.exports = app;
