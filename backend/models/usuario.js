'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var UsuarioSchema=Schema({
    user:String,
    password:String,
    nombre:String,
    apellido:String,
    imagen:String
});

module.exports=mongoose.model('Usuario',UsuarioSchema);