const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const index = require('./routes/index');
const validate = require('./routes/validate');

app.use(bodyParser.json());
app.unsubscribe(bodyParser.urlencoded({extended: false}))

app.use('/', index);
app.use('/validate', validate)

module.exports = app;