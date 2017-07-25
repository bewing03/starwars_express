const express = require('express');
const request = require('request-promise');

const app = express();

const planetRoute = express.Router();

function parseJSON(planets) {
    return JSON.parse(planets).results;
}

function findPlanet(planets, planetQuery) {
    let planet = planets.find(planet => {
        if (planet.name == planetQuery) {
                return planet;
        }
    });

    return planet;
}

planetRoute.get("/:planet?", (req, res) => {
    request("http://swapi.co/api/planets/")
        .then(parseJSON)
        .then(planets =>  {
            let planet = req.params.planet;
            if (planet == undefined) {
                res.send(planets);
            }
            else {
                let result = findPlanet(planets, planet);
                res.send(result);
            }
        });
});

module.exports = planetRoute;


// let planetQuery = req.query.planet;
//             if (planetQuery == undefined)
//                 res.send(planets);
//             else {
//                 let planet = findPlanet(planets, planetQuery);
//                 if (planet == undefined) {
//                     res.send("Planet Not Found");
//                 }
//                 res.send(planet);
//             }