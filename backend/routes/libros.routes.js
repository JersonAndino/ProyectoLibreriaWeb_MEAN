'use strict'
var express=require('express');
var router=express.Router();
var librosController=require('../controllers/libro.controller');
var usuarioController=require('../controllers/usuario.controller');
var multiparty=require('connect-multiparty');
var multipartyMiddleWare=multiparty({uploadDir:'./uploads'});
//pagina de inicio
router.get('/inicio',librosController.inicio);
//ver todos los libros
router.get('/libros', librosController.getLibros);
//router.post
router.post('/guardar-libro',librosController.saveLibro);
//ver datos de un libro
router.get('/libro/:id', librosController.getLibro);
//eliminar un libro
router.delete('/libro/:id', librosController.deleteLibro);
//actualizar un libro
router.put('/libro/:id', librosController.updateLibro);
//agregar una imagen
router.post('/subir-imagen/:id',multipartyMiddleWare,librosController.uploadImage);
//recuperar una imagen
router.get('/get-imagen/:imagen',librosController.getImage);
//router.delete

router.post('/create-user',usuarioController.saveUsuario);
router.post('/login',usuarioController.login);
router.get('/logout',usuarioController.logout);
router.get('/login',usuarioController.getLogin);
router.get('/visitas',usuarioController.visits);


module.exports=router;