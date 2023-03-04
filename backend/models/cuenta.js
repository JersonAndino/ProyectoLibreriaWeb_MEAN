'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var CuentaSchema=Schema({
    user_id:String,
    saldo:Number,
    tipo:String,
    cuenta:String,
    isActive:Boolean
});

module.exports=mongoose.model('Cuenta',CuentaSchema);