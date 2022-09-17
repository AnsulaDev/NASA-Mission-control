const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const api = require('./routes/api');

const app = express();
app.use(cors({
    origin:'http://localhost:3000',
}));
app.use(morgan('combined'));// to log the requests
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/v1',api);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public','index.html'));
});//since we dont want to load the html at startup instead we want to load the root  route
module.exports = app;