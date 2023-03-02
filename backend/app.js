'use strict'
var express=require('express');
var bodyParser=require('body-parser');
var app=express();
var librosRoutes=require('./routes/libros.routes')
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, X-Request-With, Content-Type,Accept, Access-Control-Allow, Request-Method')
    res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
    res.header("Acess-Control-Allow-Credentials",true);
    next();
});

var sessions=require('express-session');
const cookieParser = require('cookie-parser');
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "miclave1234564asdasdvfgcdfgvszdfsdfdsf",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));
app.use(cookieParser());
//rutas
/*
app.get('/',(req,res)=>{
    res.status(456).send(
        '<h1>Hola, Bienvenido</h1>'
    )
})
*/
app.use('/',librosRoutes);
module.exports=app;