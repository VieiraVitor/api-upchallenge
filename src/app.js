'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Carrega as rotas
const indexRoute = require('./routes/index-route');
const validateRoute = require('./routes/validate-route');

app.use(bodyParser.json());
app.unsubscribe(bodyParser.urlencoded({
    extended: false
}));

app.use('/', indexRoute);
app.use('/validate', validateRoute);

module.exports = app;