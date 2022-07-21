const { getAllPlanets } = require('../../models/planets.model');
function httpGetAllPlanets(req, res){
    return res.status(200).json( getAllPlanets()); /* So the return value 
    of our controller functions isn't used by Express.
    We are just using the return to make sure that our
    function stops executing and only one response is
    ever set */
}

module.exports = {
    httpGetAllPlanets,
};