"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const got = require('got');
const axios = require('axios');


 function fetchEvents() {
    const url = "http://localhost:5010/events";
    // L'usage de la librairie de requête HTTP "got" est complexe 
    // donc j'utilise axios pour l'instant
    return axios.get(url);

}

function buildOrGetGame(games, gameId) {
    var game = games[gameId]; 
    if ( game == undefined) { game = {}; games[gameId] = game;}
    return game;
}

function updateGame(game, event) {
    switch(event.type) {
        case 'game-start':
            var splitId = event.gameId.split("-");
            game.home = splitId[0];
            game.visitor = splitId[1];
            game.score = [0, 0];
            game.state = 'playing';
            break;
        case 'goal':
            game.score[(event.team === game.home) ? 0 : 1] +=1;
            break;
        case 'game-end':
            game.state = 'finished';
            break;
        default:
            break;
    }
}
function buildBoard(events) {
    var games = {};
    for (var i in events) {
        var event = events[i];
        var game = buildOrGetGame(games, event.gameId);
        updateGame(game, event);
    } 
    // console.debug(games);
    // TODO reste à transformer la map games en tableau
    return [];
}

function createLeaderBoardApp() {
    const app = express();
    app.get('/leaderboard', async (req, res, next) => {

        
        fetchEvents().then(function(response) {
            
            console.log(response); 
            let events = response.data;
            let leadeboard = buildBoard(events);
            res.send({ board: leadeboard });
        }).catch(function () {
            res.send({board: ["fail"]});
        }); 
        
    });

    return app;
}


exports.createLeaderBoardApp = createLeaderBoardApp;




