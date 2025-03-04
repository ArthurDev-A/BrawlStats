const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.get('/', function(req, res) {
    res.render('login');
});

router.post('/', async (req, res) => {
    const { email, senha } = req.body;
    const result = await usersController.loginUser(email, senha);
    res.send(result.message);
});

module.exports = router;
