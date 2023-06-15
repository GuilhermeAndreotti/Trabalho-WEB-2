var express = require('express');
var router = express.Router();
require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.LOGIN,
        pass: process.env.SENHA
    },
    tls:{
        rejectUnauthorized: false
    }
});

router.post('/enviarEmail', (req, res) => { 
    
    const { email, nome, assunto, mensagem } = req.body;
    
    const options = {
        from: email, 
        to: 'gandreotti@alunos.utfpr.edu.br', 
        subject: assunto,
        text: 'Usuário: ' + nome + 'Enviou: ' + mensagem
    };

    transporter.sendMail(options, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            alert('E-mail enviado: ' + info.response);
        }
    });
});

// Página principal
router.get('/', function(req, res, next){
    res.render('login');
});

router.get('/cadastro', function(req, res, next){
    res.render('cadastro');
});


// Página Sobre
router.get('/sobre', function(req, res, next){
    res.render('proposta');
});

// Página de contato com o email
router.get('/contato', function(req, res, next){
    res.render('contato');
});

// Página de de tecnologias.
router.get('/tecnologias', function(req, res, next){
    res.render('tecnologias');
});

router.get('/sobremim', function(req, res, next){
    
    const data = {
        nome: "Guilherme Chizzolini Andreotti",
        idade: 21,
        curso: "Engenharia de Software, Periodo 7",
        tecnologias: ["HTML", "CSS", "JavaScript", "React", "React Native", "Nest", "SQL", "C e C++", "JUnit"],
        sobre: "Olá! Tudo bem? Atualmente eu estou tentando me adaptar a nova rotina de faculdade e trabalho mas estou sempre tentando melhorar!"
    };

    res.render('sobremim', data);
});




module.exports = router;
