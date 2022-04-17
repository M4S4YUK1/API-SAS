const express = require("express");
const bcrypt = require("bcrypt");
const fs = require ("fs");
const router = express.Router();
const dadosLocais= JSON.parse( fs.readFileSync("dados.json"));


router.post("/login",(req,res)=> {

    const {rga,senha}= req.body
    if(!rga || !senha){
        res.status(433).send("RGA ou senha nao foram inseridos ");
    }
    const usuario = dadosLocais.find((user)=>user.rga == rga);
    if(!usuario){
        res.status(404).send ("Usuario não existe");
    }
    if (usuario.senha!=senha){
        res.status(401).send("Senha invalida !!");
    }


    //res.status(200).send(dadosLocais)        
    res.status(200).send({
        Nome:usuario.nome,
        Rga: usuario.rga,
        SENHA: usuario.senha,
        DatadeNascimento: usuario.dataNascimento,
        NumeroTelefone: usuario.numero,
        Email: usuario.email
    })
});

router.post("/criar",(req,res)=> {
    const{nome,rga,senha,dataNascimento,numero,email}= req.body;
    if(!rga || !senha){
        res.status(422).send("Você deve definir o RGA e a sua Senha");

    }else if(dadosLocais.find((usuarios)=> usuarios.rga == rga)){
        res.status(401).send("RGA já está em uso");
    }else{
        var dadosUsuario = {
            nome: nome,
            rga: rga,
            senha:senha,
            dataNascimento: dataNascimento,
            numero: numero,
            email:email
        }
        const salt= bcrypt.genSaltSync(10);
        dadosLocais.push(dadosUsuario);
        const dadosConvertidos = JSON.stringify(dadosLocais, null, 2);
        fs.writeFileSync("dados.json",dadosConvertidos);
        res.status(200).send({
            "success": true
        })
    }
});

module.exports= router;
