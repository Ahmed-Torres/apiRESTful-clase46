const fs = require("fs")
const mongoose = require('mongoose')

const ModeloUsuario = mongoose.model("usuarios",{
    userName: String,
    nombre: String,
    password: String,
    roles: Array,
    edad: Number
})

module.exports.getUsers = async () => {
    return new Promise( r => {
        ModeloUsuario.find((err,res)=>{
            r(res)
        })
    })
}

module.exports.getUser = async (id) => {
    return new Promise( r => {
        ModeloUsuario.findOne({_id : id},(err,res)=>{
            r(res)
        })
    })
}

module.exports.autenticarUser = async (username,password) => {
    return new Promise(r => {
        ModeloUsuario.findOne({userName : username, password : password},(err,res)=>{
            r(res)
        })
    })
}

module.exports.findUserByUserName = async (username) => {
    return new Promise(r => {
        ModeloUsuario.findOne({userName : username},(err,res)=>{
            r(res)
        })
    })
}

module.exports.actualizarUsuario = async (user,id) => {
    return new Promise((r,rej) => {
        ModeloUsuario.update({_id : id}, {nombre: user.nombre}, (err,res)=>{
            if(err){
                rej(new Error("Error al actualizar el usuario"))
            }
            r()
        })
    })
}

module.exports.eliminar = async (id) => {
    return new Promise((r,rej) => {
        ModeloUsuario.deleteOne({_id : id}, (err,res)=>{
            if(err){
                rej(new Error("Error al eliminar el usuario"))
            }
            r()
        })
    })
}

//payload hace referencia a la data que te trae del body de la peticion

module.exports.registrarUser = async payload => {
    return new Promise (async (r,rej) => {
        let user = await this.findUserByUserName(payload.userName)

        if (user){
            rej (new Error("El usuario ya existe"))
            return;
        }

        // const usuario = new ModeloUsuario({
        //     userName: payload.userName,
        //     nombre: payload.nombre,
        //     password: payload.password,
        //     edad: payload.edad
        // }) ES LO MISMO QUE HACER LA LINEA DE ABAJO, YA QUE TIENE LA MISMA ESTRUCTURA :d
        const usuario = new ModeloUsuario(payload)
        usuario.roles = ["NORMAL_USER"]

        usuario.save((err,doc)=>{
            if (err) {
                throw new Error("Ocurrio un error en generar el usuario")
            }
            r(doc)
        })
    })
}