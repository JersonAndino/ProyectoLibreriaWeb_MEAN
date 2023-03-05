'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var TransaccionSchema=Schema({
    cuenta_emisor:String,
    cuenta_receptor:String,
    monto:Number,
    tipo:String,
    fecha:Object
});

module.exports=mongoose.model('Transaccion',TransaccionSchema);