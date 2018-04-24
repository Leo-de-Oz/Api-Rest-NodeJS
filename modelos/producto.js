'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productoSchema = Schema({
    nombre : String,
    imagen : String,
    precio : Number,
    categoria : { type: String , enum: ['computadoras','celulares','domesticos']},
    descripcion: String
})


module.exports = mongoose.model('Producto', productoSchema)