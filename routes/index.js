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



module.exports = router;
