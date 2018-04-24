'use strict'

const express = require('express')
const productoController = require('../controladores/productoController')
const usuarioController = require('../controladores/usuarioController')
const auth = require('../middlewares/auth')
const router = express.Router()

/* Rutas */

//ruta para obtener todos los productos:
router.get('/productos', productoController.getProductos)

//ruta para obtener producto por id:
router.get('/producto/:IdProducto', productoController.getProducto)

//Ruta para insertar un producto por ID:
router.post('/producto', productoController.insertProducto)

//ruta para Actualizar un  Producto:
router.put('/producto/:IdProducto', productoController.updateProducto)

//ruta para eliminar el producto.
router.delete('/product/:IdProducto', productoController.deleteProducto)

/* Rutas de usuario */
router.post('/signup', usuarioController.signUp)

router.post('/signin', usuarioController.signIn)

router.get('/private', auth.isAuth , (req, res) => {
    res.status(200).send({user : req.user,message : 'si tienes acceso'})
})

module.exports = router