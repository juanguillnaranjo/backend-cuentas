'use strict'

var express = require('express');
const mongoose = require('mongoose');  // <--- Esto faltaba
var cors = require('cors');   // ← importar así
require('dotenv').config();

var app = express();


// activar CORS
app.use(cors());              // ← aquí se ejecuta
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Atlas conectado"))
.catch(err => console.error("MongoDB Atlas error:", err));

const PORT = process.env.PORT || 3000;
// cargar rutas
var cuentas_routes = require('./routes/routes-cuentas');

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rutas
app.use('/api', cuentas_routes);
app.listen(PORT, () => {
  console.log(`Backend corriendo en puerto ${PORT}`);
});

module.exports = app;
