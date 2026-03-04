'use strict'

const jwt = require('jsonwebtoken');

exports.ensureAuth = function(req, res, next){

    if(!req.headers.authorization){
        return res.status(403).send({
            message: "No autorizado"
        });
    }

    const token = req.headers.authorization.replace('Bearer ', '');

    try{

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.user = payload;

        next();

    }catch(err){

        return res.status(401).send({
            message: "Token inválido o expirado"
        });
    }
}