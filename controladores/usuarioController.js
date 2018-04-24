'use strict'

const mongoose = require('mongoose')
const Usuario = require('../modelos/usuario')
const service = require('../services/service')

function signUp(req, res) {
    
    const usuario = new Usuario({
        email : req.body.email,
        nombre : req.body.nombre,
        password : req.body.password
    })
    
    //asignamos el gravatar:
    usuario.avatar = usuario.gravatar()
    
    usuario.save( err => {
        if(err) return res.status(500).send('Error al crear el usuario '+ err)
        console.log(usuario)
        return res.status(201).send({ token: service.createToken(usuario) })
    })
    
}

function signIn(req, res) {
    Usuario.find({email: req.body.email}, (err, user) => {
        if(err) return res.status(500).send(err)
        if(!user) return res.status(404).send('Usuario no encontrado')

        req.user = user

        res.status(200).send({
            mensaje: 'Te has loggeado correctamente.',
            token: service.createToken(user)
        })
    }) 
}

module.exports = {
    signUp,
    signIn
}