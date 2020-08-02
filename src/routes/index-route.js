'use strict';

const express = require('express');
const router = express.Router();

// Apenas Get de teste da API
const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: 'Teste API'
    });
});

module.exports = route;