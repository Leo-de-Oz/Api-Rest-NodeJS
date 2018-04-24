'use strict'

const Producto = require('../modelos/producto')

function insertProducto(req, res) {
    console.log('Post /api/producto')
    console.log(req.body)
    //res.status(200).send({ mensaje : 'el producto a sido recibido' })
    let producto = new Producto()
    producto.nombre = req.body.nombre
    producto.imagen = req.body.imagen
    producto.precio = req.body.precio
    producto.categoria = req.body.categoria
    producto.descripcion = req.body.descripcion

    producto.save((err, proGuardado) => {
        if (err) { throw err }
        else {
            res.status(200).send({ producto: proGuardado })
        }
    })
}

function getProducto(req, res) {
    let IdProducto = req.params.IdProducto
    Producto.findById(IdProducto, (err, producto) => {
        if (err) res.status(500).send('Error al realizar la petición')
        if (!producto) res.status(404).send('El producto no existe')
        res.status(200).send({ producto })
    })
}

function getProductos(req, res) {
    Producto.find({}, (err, data) => {
        if (err) res.status(500).send('Hubo un error con la consulta.')
        if (!data) res.status(200).send('no se encontraron productos.')

        res.status(200).send({ productos: data })
    })
}

function updateProducto(req, res) {
    let idProducto = req.params.IdProducto

    let new_producto = {
        nombre: req.body.nombre,
        imagen: req.body.imagen,
        precio: req.body.precio,
        categoria: req.body.categoria,
        descripcion: req.body.descripcion
    }

    Producto.findByIdAndUpdate(idProducto, new_producto, (err, productoUpdate) => {
        if (err) res.status(500).send('Error al ejecutar la petición. ' + err)
        if (!productoUpdate) res.status(404).send('Error al encontrar el producto')
        res.status(200).send('Se ha modificado con éxito')
    })
}

function deleteProducto(req, res) {
    let idProducto = req.params.IdProducto
    Producto.findByIdAndRemove(idProducto, (err, response) => {
        if (err) res.status(500).send('Ocurrio un error al eliminar')
        if (!response) res.status(404).send('no se encontraron datos')//??

        res.status(200).send('Eliminado con éxito.')
    })
}

let va = 2

module.exports = {
    insertProducto,
    getProducto,
    getProductos,
    updateProducto,
    deleteProducto
}