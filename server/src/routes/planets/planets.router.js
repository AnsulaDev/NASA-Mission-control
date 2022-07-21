const express = require('express');

const {
    httpGetAllPlanets,
} = require('./planets.controller');

const planetsRounter = express.Router();

planetsRounter.get('/planets', httpGetAllPlanets);

module.exports =  planetsRounter;
