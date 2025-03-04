const express = require('express');
const apiBrawl = require('../dao/apiBrawl');

const router = express.Router();

router.get('/', (req, res) => {
    const erro = req.cookies.erro || "";
    res.cookie('erro', '');
    res.render('principal', { erro });
});

router.get('/:tag', async (req, res) => {
    const tag = req.params.tag;
    const jogador = await apiBrawl.getPlayerStats(tag);
    const brawlers = await apiBrawl.getBrawlers();
    if (jogador) {
        res.render('jogador', { jogador: jogador, brawlers: brawlers });
    } else {
        res.cookie('erro', "O jogador não foi encontrado");
        res.redirect('/jogador');
    }
});

router.post('/', async (req, res) => {
    let { tag } = req.body;
    if (tag[0] === '#') {
        tag = tag.slice(1);
    }
    res.redirect('/jogador/'+encodeURIComponent(tag));
});

module.exports = router
