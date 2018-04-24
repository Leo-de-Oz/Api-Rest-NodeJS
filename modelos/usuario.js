'use strict'

const mongoose = require('mongoose')
const Schema   = mongoose.Schema
const bcrypt   = require('bcrypt-nodejs')
const crypto   = require('crypto')

const UsuarioSchema = new Schema ({
    email : {type: String, unique: true, lowercase: true},
    nombre : String,
    avatar: String,
    password: {type: String, select: false},
    fecha_reg : { type: Date, default: Date.now() },
    ultimo_login : Date
})

UsuarioSchema.pre('save', function(next) {
    let usuario = this
    if (!usuario.isModified('password')) {
        return next()
    }else{
        bcrypt.genSalt(10, (err, salt) => {
            if(err) return next(err)

            bcrypt.hash(usuario.password, salt, null, (err, hash) => {
                if(err) return next(err)

                usuario.password = hash
                next()
            })
        })
    }
})

UsuarioSchema.methods.gravatar = function (size) {
    if (!size) { size = 200; }
    
    if (!this.email) return `https://gravatar.com/avatar/?s=2006d=retro`
    
    const md5 = crypto.createHash('md5').update(this.email).digest('hex')

    return `https://gravatar.com/avatar/${md5}?s=2006d=retro`
}

//método para comparar las contraseñas:
UsuarioSchema.methods.comparePassword = function (candidatePassword,hash,cb) {
    bcrypt.compare(candidatePassword,hash, (err, isMatch) => { 
        console.log('compare: ',candidatePassword)  
        cb(err, isMatch) 
        })  
      }

module.exports = mongoose.model('Usuario', UsuarioSchema)