//Richard Masayuki Terayama;
//Igor Lazarin Oliani;
//12/04/2022;
//SAS-API PARA CADASTRO E VERIFICACAO DE USUARIO

const express = require("express");
const app = express ();
const fs = require ("fs");
const router = require("./routes/login_criar")

app.use(express.json());
app.use(router);

app.get("/",(req,res)=> {
    res.status(200).send("ok");

});

app.listen(3000,()=>{
    console.log ("Servidor esta sendo executado na porta 3000");

});
module.exports = app;