'use strict'

const mongoose   = require('mongoose')
const app = require('./app')
const config = require('./config')

//conexión a mongoDB:
mongoose.connect(config.db, (err, res) => {
    if(err) throw err;
    console.log('Conexión a la base de datos correcta.')
})

app.listen(config.port, () => {
    console.log(`app corriendo en http:${config.port}`)
})

 