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

    let query = Usuario.findOne({email: req.body.email})
    query.select('_id email password')
    query.exec((err, user) => {
        if(err) return res.status(500).send(err)
        if(!user) return res.status(403).send('Usuario no encontrado')

        let usuario = new Usuario()
        usuario.comparePassword(req.body.password, user.password, (err,isMatch) => {
        if(err) {return res.status(500).send({mensaje:'Error al ingresar'})}
        if(!isMatch){return res.status(403).send({mensaje:'Credenciales incorrectas'})}
        
        req.user = user
        return res.status(200).send({
                    mensaje: 'Te has loggeado correctamente.',
                    token: service.createToken(user)
                })
        })
    })
    
    /*Usuario.findOne({email: req.body.email}, (err, user) => {
        if(err) return res.status(500).send(err)
        if(user.length == 0) return res.status(403).send('Usuario no encontrado')

        console.log(user)
        console.log(user.password)
        let asd = new Usuario()
            return asd.comparePassword(req.body.password, user.password, (err,isMatch) => {
            if(err) {return res.status(500).send({mensaje:'Error al ingresar'})}
            if(!isMatch){return res.status(403).send({mensaje:'Credenciales incorrectas'})}
            
            req.user = user
            return res.status(200).send({
                     mensaje: 'Te has loggeado correctamente.',
                     token: service.createToken(user)
                    })
        })
    }).select({_id: 1, email: 1, password: 1}) */
}

module.exports = {
    signUp,
    signIn
}