'use strict'
var fs=require('fs');
const path=require('path');
var Cuenta=require('../models/cuenta');
var Transaccion=require('../models/transaccion');
const session = require('express-session');

var controller={
    doTransaccion:function(req,res){
        var transaccion=new Transaccion();
        var params=req.body;
        
        transaccion.cuenta_emisor=params.cuenta_emisor;
        transaccion.cuenta_receptor=params.cuenta_receptor;
        transaccion.monto=params.monto;
        transaccion.tipo=params.tipo;
        
        var today=new Date();
        var year=today.getFullYear();
        var month=today.getMonth();
        var day=today.getDate();
        var fecha={anio:year,mes:month,dia:day};

        transaccion.fecha=fecha;

        var emisorDef="0000000000";

        if (transaccion.tipo=='Deposito'){
            transaccion.cuenta_emisor=emisorDef;
            Cuenta.findOneAndUpdate({cuenta:transaccion.cuenta_receptor},{ $inc: { saldo: +transaccion.monto } },{new:true})
                .then(resultReceptor=>{
                    if (!resultReceptor) return res.status(200).send({message:"No se pudo realizar la transaccion 1"});
                    transaccion.save()
                    .then(result => {
                        if (!result) return res.status(200).send({message:"No se pudo realizar la transaccion"});
                        return res.status(200).send({result});
                    })
                    .catch(err => {
                        console.log(err);
                    });
                })
                .catch(err=>{
                    console.log(err);
                });
        }
        if (transaccion.tipo=='Transferencia'){
            Cuenta.findOneAndUpdate({cuenta:transaccion.cuenta_emisor},{ $inc: { saldo: -transaccion.monto } },{new:true})
            .then(resultEmisor=>{
                if (!resultEmisor) return res.status(200).send({message:"No se pudo realizar la transaccion"});
                Cuenta.findOneAndUpdate({cuenta:transaccion.cuenta_receptor},{ $inc: { saldo: +transaccion.monto } },{new:true})
                .then(resultReceptor=>{
                    if (!resultReceptor) return res.status(200).send({message:"No se pudo realizar la transaccion"});
                    transaccion.save()
                    .then(result => {
                        if (!result) return res.status(200).send({message:"No se pudo realizar la transaccion"});
                        return res.status(200).send({result});
                    })
                    .catch(err => {
                        console.log(err);
                    });
                })
                .catch(err=>{
                    console.log(err);
                });
            })
            .catch(err=>{
                console.log(err);
            });
        }
    }
}

module.exports=controller;