const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
require('dotenv').config();
const uri = process.env.URI;
const client = new MongoClient(uri);
const mydb = client.db(process.env.NAME_DB).collection('users');
const usersDAO = require('./dao/usersDAO');
const apiBrawl = require('./dao/apiBrawl');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

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
    res.render('principal', {erro: ""});
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

app.post('/principal', async (req, res) => {
    const { estatistica } = req.body;
    const jogador = await apiBrawl.getPlayerStats(estatistica);
    if (jogador) {
        res.render('jogador', { jogador: jogador });
    } else {
        console.log(jogador);
        res.render('principal', { erro: "O jogador não foi encontrado" });
    }
});

module.exports = app;
