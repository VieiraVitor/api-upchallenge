'use strict';

const app = require('../src/app');
const http = require('http');

const port = '4000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port);


