const express = require('express');
const { MongoClient } = require('mongodb');
const usersController = require('../controllers/usersController');
require('dotenv').config();

const router = express.Router();
const uri = process.env.URI;
const client = new MongoClient(uri);
const mydb = client.db(process.env.NAME_DB).collection('users');

router.get('/', function(req, res) {
    res.render('register');
});

router.post('/', async (req, res) => {
    const { email, senha } = req.body;
    const user = { email, senha };
    await usersController.insertUser(mydb, user);
    res.send("Cadastro realizado com sucesso!");
});

module.exports = router;
