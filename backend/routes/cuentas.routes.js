'use strict'
var express=require('express');
var router=express.Router();
var cuentasController=require('../controllers/cuenta.controller');
var multiparty=require('connect-multiparty');
var multipartyMiddleWare=multiparty({uploadDir:'./uploads'});

// Crear una cuenta
router.post('/save-cuenta',cuentasController.saveCuenta);

// Crear una cuenta
router.get('/cuentas/:id',cuentasController.getCuentasUser);

module.exports=router;