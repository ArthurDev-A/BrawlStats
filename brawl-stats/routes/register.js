const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.get('/', function(req, res) {
    res.render('register');
});

router.post('/', async (req, res) => {
    const { email, senha } = req.body;
    const user = { email, senha };
    const result = await usersController.insertUser(user);
    res.send(result.acknowledged ? "Cadastro realizado com sucesso!" : "Cadastro não foi realizado! Email já exisente.");
});

module.exports = router;
