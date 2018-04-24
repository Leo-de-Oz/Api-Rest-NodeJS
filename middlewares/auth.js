'use strict'

const service = require('../services/service')

//request, response, next(si pasa la autentificacion)
function isAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send( {message: 'No se tiene autorización.'})
    }

    const token = req.headers.authorization.split(" ")[1] // spliteamos el token y recuperamos el segundo elemento del array.
    

    service.decodeToken(token)
    .then((response) => {
        req.user = response //response = payload.sub *en service.js id de usuario
        next()
    })
    .catch((response) => {
        req.status(response.status)
    })
}

module.exports = { isAuth }

