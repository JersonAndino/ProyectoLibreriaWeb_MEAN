'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var LibroSchema=Schema({
    nombre:String,
    autor:String,
    edicion:String,
    anio:Number,
    precio:Number,
    imagen:String
});

module.exports=mongoose.model('Libro',LibroSchema);