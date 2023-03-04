'use strict'
var express=require('express');
var router=express.Router();
var cuentasController=require('../controllers/cuenta.controller');
var multiparty=require('connect-multiparty');
var multipartyMiddleWare=multiparty({uploadDir:'./uploads'});

router.post('/save-cuenta',cuentasController.saveCuenta);

module.exports=router;