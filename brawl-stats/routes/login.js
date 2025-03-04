const express = require('express');
const { MongoClient } = require('mongodb');
const usersController = require('../controllers/usersController');
require('dotenv').config();

const router = express.Router();
const uri = process.env.URI;
const client = new MongoClient(uri);
const mydb = client.db(process.env.NAME_DB).collection('users');

router.get('/', function(req, res) {
  res.render('login');
});

router.post('/', async (req, res) => {
  const { email, senha } = req.body;
  const result = await usersController.loginUser(mydb, email, senha);
  res.send(result.message);
});

module.exports = router;
