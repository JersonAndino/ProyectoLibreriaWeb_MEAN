'use strict'
//console.log("1");
var mongoose=require('mongoose');
//console.log("2");
var port='3600';
//console.log("3");
mongoose.promise=global.Promise;
//console.log("4");
mongoose.set("strictQuery",false);
var app=require('./app');
//console.log("5");
mongoose.connect('mongodb://127.0.0.1:27017/libros')
.then(()=>{
    console.log("Conexion establecida con la bdd");
    app.listen(port,()=>{
        console.log("Conexion establecida en el url: localhost:3600");
    })
})
.catch(err=>console.log(err))