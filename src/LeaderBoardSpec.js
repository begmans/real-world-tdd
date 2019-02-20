"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require('supertest-as-promised');
const express = require('express');
const LeaderBoardLocalService_1 = require("./LeaderBoard.js");
const got = require('got');
describe('LeaderBoard', () => {
    it('should display a leaderboard with the state of all games', async function () {
        this.timeout(6000);
        const app = LeaderBoardLocalService_1.createLeaderBoardApp();
        await request(app)
            .get('/leaderboard')
            .expect({ board: [] });
    });
});
