'use strict'
var Libro=require('../models/libro');
var fs=require('fs');
const path=require('path');
var Usuario=require('../models/usuario');
const session = require('express-session');

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
            if (!result) res.status(404).send({message:'Credenciales incorrectas'});
            if (user==result.user && password==result.password){
                var userTemp=result;
                delete userTemp.password;
                req.session.user=userTemp;
                res.status(200).send({message:'Has iniciado sesión correctamente',usuario:user,session:req.session});
            }
        })
        .catch(err => {
            res.status(404).send({message:'Algo ha fallado'});
        })
    },
    getLogin:function(req,res){
        req.session.user ? res.status(200).send({loggedIn: true,user:req.session.user.user,id:req.session.user._id}) : res.status(200).send({loggedIn: false});
        
    },
    logout:function(req,res){
        req.session.destroy((err)=>{
            if (err) {
                res.status(500).send('Could not log out.');
            } else {
                res.status(200).send({});
            }
        });
    },
    visits:function(req,res){
        if(req.session.page_views){
            req.session.page_views++;
            res.send("You visited this page " + req.session.page_views + " times");
         } else {
            req.session.page_views = 1;
            res.send("Welcome to this page for the first time!");
         }
    }
}

module.exports=controller;