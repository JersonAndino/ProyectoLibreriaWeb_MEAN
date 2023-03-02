'use strict'
var Libro=require('../models/libro');
var fs=require('fs');
const path=require('path');
var controller={
    inicio:function(req,res){
        return res.status(201).send("<h1>HOLA 2</h1>");
    },
    getLibros:function(req,res){
        Libro.find({}).sort().exec()
        .then(result => {
            if (!result) return res.status(404).send({message:'No hay libros para mostrar'});
            //console.log(result);
            return res.status(200).send({result});
        })
        .catch(err => {
            return res.status(500).send({message:'Error al recuperar los datos'});
        });
    },
    saveLibro:function(req,res){
        var libro = new Libro();
        var params=req.body;
        libro.nombre=params.nombre;
        libro.autor=params.autor;
        libro.edicion=params.edicion;
        libro.anio=params.anio;
        libro.precio=params.precio;
        libro.imagen=null;
        
        libro.save()
        .then(result => {
            if (!result) return res.status(200).send({message:"No hay libro guardado"});
            return res.status(200).send({result});
        })
        .catch(err => {
            console.log("error");
        });
    },
    getLibro:function(req,res){
        var libroId=req.params.id;
        if(libroId==null) return res.status(404).send({message:'El libro no existe'}); 

        Libro.findById(libroId)
        .then(result => {
            if (!result) return res.status(404).send({message:'El libro no existe'});
            return res.status(200).send({result});
        })
        .catch(err => {
            return res.status(500).send({message:'Error al recuperar los datos'});
        });
    },
    deleteLibro:function(req,res){
        var libroId=req.params.id;
        
        Libro.findByIdAndRemove(libroId)
        .then(result => {
            if (!result) return res.status(404).send({message:'No se puede eliminar el libro'});
            return res.status(200).send({result});
        })
        .catch(err => {
            return res.status(500).send({message:'Error al borrar los datos'});
        });
    },
    updateLibro:function(req,res){
        var libroId=req.params.id;
        var update=req.body;

        Libro.findByIdAndUpdate(libroId,update,{new:true})
        .then(result => {
            if (!result) return res.status(404).send({message:'No se pueden actualizar los datos'});
            return res.status(200).send({result});
        })
        .catch(err => {
            return res.status(500).send({message:'Error al actualizar los datos'});
        });
    },
    uploadImage:function(req,res){
        var libroId=req.params.id;
        var fileName='Imagen no subida';

        if(req.files){
            var filePath=req.files.imagen.path;
            var file_split=filePath.split('\\');
            var fileName=file_split[1];
            var extSplit=fileName.split('\.');
            var fileExt=extSplit[1];
            if(fileExt=='png'||fileExt=='jpg'||fileExt=='jpeg'||fileExt=='gif'){
                Libro.findByIdAndUpdate(libroId,{imagen:fileName},{new:true})
                .then(result => {
                    if (!result) return res.status(404).send({message:'No se pueden actualizar los datos'});
                    return res.status(200).send({result});
                })
                .catch(err => {
                    return res.status(500).send({message:'Error al actualizar los datos'});
                });
            }else{
                fs.unlink(filePath,(err)=>{
                    return res.status(200).send({message:'La extension no es valida'});
                });
            }
        }else{
            return res.status(200).send({message:fileName});
        }
    },
    getImage:function(req,res){
        var file=req.params.imagen;
        var path_file="./uploads/"+file;
        fs.exists(path_file,(exists)=>{
            if (exists){
                return  res.sendFile(path.resolve(path_file));
            }else{
                res.status(200).send({message:"La imagen no existe"});
            }
        })
    }
}

module.exports=controller;