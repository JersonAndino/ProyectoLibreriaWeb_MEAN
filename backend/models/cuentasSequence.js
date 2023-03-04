'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var cuentasSequenceSchema=Schema({
    seq:Number
});

module.exports=mongoose.model('cuentaSequence',cuentasSequenceSchema);