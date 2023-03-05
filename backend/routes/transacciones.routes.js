'use strict'
var express=require('express');
var router=express.Router();
var transaccionController=require('../controllers/transaccion.controller');
var multiparty=require('connect-multiparty');
var multipartyMiddleWare=multiparty({uploadDir:'./uploads'});

// Hacer una transaccion
router.post('/do-transaccion',transaccionController.doTransaccion);

// Crear una cuenta
//router.get('/cuentas/:id',cuentasController.getCuentasUser);

module.exports=router;