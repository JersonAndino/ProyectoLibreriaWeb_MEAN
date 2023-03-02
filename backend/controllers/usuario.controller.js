'use strict'
var Libro=require('../models/libro');
var fs=require('fs');
const path=require('path');
var Usuario=require('../models/usuario');

var controller={
    inicio:function(req,res){
        var session=req.session;
        var user=session.userid;
        console.log(session);
        return res.status(201).send({message: "Hola",user});
    },
    saveUsuario:function(req,res){
        var usuario=new Usuario();
        var params=req.body;
        usuario.user=params.user;
        usuario.password=params.password;
        usuario.nombre=params.nombre;
        usuario.apellido=params.apellido;
        usuario.imagen=null;
 
        usuario.save()
        .then(result => {
            if (!result) return res.status(200).send({message:"No se ha guardado el usuario"});
            return res.status(200).send({result});
        })
        .catch(err => {
            console.log(err);
        });   
    },
    login:function(req,res){
        var user=req.body.user;
        var password=req.body.password;
        var session=req.session;
        if (user==null || password==null) return res.status(404).send({message:'Algo ha fallado'});
        Usuario.findOne({user,password})
        .then(result => {
            if (!result) return res.status(404).send({message:'Credenciales incorrectas'});
            if (user==result.user && password==result.password){
                session=req.session;
                session.user=req.body.user;
                return res.status(200).send({message:'Has iniciado sesión correctamente',usuario:user});
            }
        })
        .catch(err => {
            return res.status(404).send({message:'Algo ha fallado'});
        })
    },
    logout:function(req,res){
        req.session.destroy();
        return res.send({message:"Sesion finalizada"});
    }
}

module.exports=controller;