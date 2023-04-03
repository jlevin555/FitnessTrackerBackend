require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const client = require('./db/client');

const server = express();
const { PORT = 3000 } = process.env;
const { apiRouter } = require('./api/index');

// Setup your Middleware and API Router here

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/api', apiRouter);

server.use((req, res, next) => {
    res.sendStatus(404);
});

server.use((error, req, res, next) => {
    console.log('Server Log', error);
    res.send(error);
});

server.listen(PORT, () => {
    client.connect();
    console.log(`Listening on port ${PORT}`);
});

module.exports = app;
