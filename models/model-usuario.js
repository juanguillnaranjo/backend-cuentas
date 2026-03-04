'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    rol: {
        type: String,
        default: 'USER'
    }

});

module.exports = mongoose.model('Usuario', UsuarioSchema);