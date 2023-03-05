'use strict'
var express=require('express');
var router=express.Router();
var cuentasController=require('../controllers/cuenta.controller');
var multiparty=require('connect-multiparty');
var multipartyMiddleWare=multiparty({uploadDir:'./uploads'});

// Crear una cuenta
router.post('/save-cuenta',cuentasController.saveCuenta);

// Recuperar las cuentas de un usuario
router.get('/cuentas/:id',cuentasController.getCuentasUser);

// Validar una cuenta
router.get('/validar-cuenta/:cuenta',cuentasController.validarCuenta);

module.exports=router;