'use strict'

const Usuario = require('../models/model-usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



var controller = {

    profile: function(req, res){

        return res.status(200).send({
            message: "Ruta protegida",
            usuario: req.user
        });

    },

    // 🟢 REGISTRO
    register: async function(req, res){

        try{

            const { nombre, email, password } = req.body;

            // Verificar si ya existe
            const usuarioExistente = await Usuario.findOne({ email });

            if(usuarioExistente){
                return res.status(400).send({
                    message: "El usuario ya existe"
                });
            }

            // Encriptar contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            const nuevoUsuario = new Usuario({
                nombre,
                email,
                password: hashedPassword
            });

            const usuarioGuardado = await nuevoUsuario.save();

            return res.status(200).send({
                message: "Usuario creado correctamente"
            });

        }catch(err){
            return res.status(500).send({
                message: "Error en registro",
                error: err.message
            });
        }
    },


    // 🔐 LOGIN
    login: async function(req, res){

        try{

            const { email, password } = req.body;

            const usuario = await Usuario.findOne({ email });

            if(!usuario){
                return res.status(404).send({
                    message: "Usuario no encontrado"
                });
            }

            const passwordValida = await bcrypt.compare(password, usuario.password);

            if(!passwordValida){
                return res.status(401).send({
                    message: "Contraseña incorrecta"
                });
            }

            // Crear token
            const token = jwt.sign(
                {
                    id: usuario._id,
                    email: usuario.email,
                    rol: usuario.rol
                },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES }
            );

            return res.status(200).send({
                message: "Login exitoso",
                token
            });

        }catch(err){
            return res.status(500).send({
                message: "Error en login",
                error: err.message
            });
        }
    }

};

module.exports = controller;