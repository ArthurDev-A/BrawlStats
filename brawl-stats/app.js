const express = require('express');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const usersDAO = require('./dao/usersDAO');
const apiBrawl = require('./dao/apiBrawl');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const uri = process.env.URI;
const client = new MongoClient(uri);
const mydb = client.db(process.env.NAME_DB).collection('users');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/principal', (req, res) => {
    const erro = req.cookies.erro || "";
    res.cookie('erro', '');
    res.render('principal', { erro });
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await usersDAO.getUserByEmail(mydb, email);
    if (user && await bcrypt.compare(password, user.password)) {
        res.send("Login realizado com sucesso!");
    } else {
        res.send("Login falhou!");
    }
});

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const user = { email, password };
    await usersDAO.insertUser(mydb, user);
    res.send("Cadastro realizado com sucesso!");
});

app.post('/jogador', async (req, res) => {
    const { estatistica } = req.body;
    const jogador = await apiBrawl.getPlayerStats(estatistica);
    const brawlers = await apiBrawl.getBrawlers();
    if (jogador) {
        res.render('jogador', { jogador: jogador, brawlers: brawlers });
    } else {
        res.cookie('erro', "O jogador não foi encontrado");
        res.redirect('/principal');
    }
});

module.exports = app;
