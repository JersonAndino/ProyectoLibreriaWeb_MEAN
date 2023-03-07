'use strict'
var fs=require('fs');
const path=require('path');
var Cuenta=require('../models/cuenta');
var Seq=require('../models/cuentasSequence');
const session = require('express-session');

var controller={
    saveCuenta:function(req,res){
        var cuenta=new Cuenta();
        var params=req.body;
        cuenta.user_id=params.user_id;
        cuenta.saldo=0;
        cuenta.tipo=params.tipo;
        cuenta.isActive=true;

        var numCuenta;
        Seq.findOneAndUpdate({_id:'64036ca5d874fb925225d84a'},{ $inc: { seq: 1 } },{new:true})
        .then(ress=>{
            var num = ress.seq;
            var num = num.toString();
            var numCuenta="0000000000";
            numCuenta=numCuenta.slice(0,-num.length);
            numCuenta=numCuenta+num;

            cuenta.cuenta=numCuenta;
            
            cuenta.save()
            .then(result => {
                if (!result) return res.status(200).send({message:"Ha ocurrido un problema creando la cuenta"});
                return res.status(200).send({result});
            })
            .catch(err => {
                console.log(err);
            });             
        });
    },
    getCuentasUser:function(req,res){
        var userid=req.params.id;
        //console.log(userid);
        Cuenta.find({user_id:userid, isActive:true}).sort().exec()
        .then(result => {
            if (!result) return res.status(404).send({message:'No se encontraron cuentas registradas'});
            //console.log(result);
            return res.status(200).send({result});
        })
        .catch(err => {
            return res.status(500).send({message:'Error al recuperar los datos'});
        });
    },
    validarCuenta:function(req,res){
        var cuentaV=req.params.cuenta;
        Cuenta.findOne({cuenta:cuentaV, isActive:true})
        .then(result=>{
            if (!result) return res.status(404).send({message:'No se encontraron cuentas registradas'});
            return res.status(200).send({result});
        })
        .catch(err=>{
            console.log(err);
        });
    },
    desactivarCuenta:function(req,res){
        var cuentaV=req.params.cuenta;
        Cuenta.findOneAndUpdate({cuenta:cuentaV},{isActive:false},{new:true})
        .then(result=>{
            if (!result) return res.status(404).send({message:'No se ha podido desactivar la cuenta'});
            return res.status(200).send({result});
        })
        .catch(err=>{
            console.log(err);
        });
    }
}

module.exports=controller;