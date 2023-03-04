'use strict'
var fs=require('fs');
const path=require('path');
var Cuenta=require('../models/cuenta');
const session = require('express-session');

var controller={
    saveCuenta:function(req,res){
        var cuenta=new Cuenta();
        var params=req.body;
        cuenta.user_id=params.user_id;
        cuenta.saldo=0;
        cuenta.tipo=params.tipo;
        cuenta.cuenta=params.cuenta;
        cuenta.isActive=true;


        cuenta.save()
        .then(result => {
            if (!result) return res.status(200).send({message:"No se ha guardado el usuario"});
            return res.status(200).send({result});
        })
        .catch(err => {
            console.log(err);
        });   
    },
    getCuentasUser:function(req,res){
        //user_id:req.body.user_id
        Cuenta.find({}).sort().exec()
        .then(result => {
            if (!result) return res.status(404).send({message:'No hay libros para mostrar'});
            console.log(result);
            return res.status(200).send({result});
        })
        .catch(err => {
            return res.status(500).send({message:'Error al recuperar los datos'});
        });
    },
}

module.exports=controller;